import { Router } from "express";
import sample from "../controllers/sample.controllers";

const router = Router();
router.route("/").get(sample);
export default router;
