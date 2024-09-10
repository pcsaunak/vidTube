import { Router } from "express";
import { MulterRequest, registerUser } from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

// Define the upload fields
const uploadFields = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
]);

router.route("/register").post(uploadFields, (req, res, next) => {
  registerUser(req as MulterRequest, res, next);
});

export default router;
