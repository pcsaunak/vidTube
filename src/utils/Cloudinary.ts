import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDNIARY_API_SECRET,
});

const uploadToCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File Uploaded on Cloudinary. File Src:", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    /**
     * If there is any issue with the file upload, we will
     * also delete the file from local storage.
     */
    fs.unlinkSync(localFilePath);
    console.log("Error in file uploading", error);
    return null;
  }
};

const deleteFromCloudinary = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`Deleted from Cloudinary. public id ${publicId}`);
  } catch (error) {
    console.log("Error deleting from Cloudinary", error);
    return null;
  }
};
export { uploadToCloudinary, deleteFromCloudinary };
