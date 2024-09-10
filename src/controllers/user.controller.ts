import { Multer } from "multer";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { NextFunction, Request, Response } from "express";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/Cloudinary";
import { ApiResponse } from "../utils/ApiResponse";

// Define the structure of the files in the request
export interface MulterRequest extends Request {
  files: {
    avatar?: Express.Multer.File[];
    coverImage?: Express.Multer.File[];
  };
}

const registerUser = asyncHandler(async (req: MulterRequest, res: Response) => {
  const { fullname, email, username, password } = req.body;

  if (
    [fullname, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  /**
   * What if we alread have a User present.
   * So we need to query the DB.
   *
   * Mongo operators always come up with $.... so any mongo operator can be available with the use of $or , $and
   */

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    throw new ApiError(409, "User is already present with email / username");
  }

  const avatarLocalPath = req.files.avatar?.[0].path;
  const coverImageLocalPath = req.files.coverImage?.[0].path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }
  let avatar;
  let coverImage;

  try {
    avatar = await uploadToCloudinary(avatarLocalPath);
    if (coverImageLocalPath) {
      coverImage = await uploadToCloudinary(coverImageLocalPath);
    }
  } catch (error) {
    console.log("Error in uploading to cloudinary", error);
    throw new ApiError(500, "Failed to upload to Cloudinary");
  }

  try {
    const user = await User.create({
      fullname,
      avatar: avatar?.url,
      coverimage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase(),
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshtoken"
    );

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering a user");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User created successfully"));
  } catch (error) {
    console.log("User creation failed");
    if (avatar) {
      await deleteFromCloudinary(avatar.public_id);
    }

    if (coverImage) {
      await deleteFromCloudinary(coverImage.public_id);
    }
    throw new ApiError(
      500,
      "Something went wrong while registering a new user and images were deleted"
    );
  }
});

export { registerUser };
