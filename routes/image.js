import express from "express";
import { upload } from "../middlewares/multer";
import { uploadImage, uploadImages, showImage } from "../controllers/image";

const router = express.Router();

router.post("/uploadfile", upload.single("image"), uploadImage);
router.post("/uploadfiles", upload.array("image", 3), uploadImages);
router.get("/upload/:filename", showImage);

export default router;
