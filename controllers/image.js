import { getFileStream } from "../middlewares/multer";

export const uploadImage = (req, res, next) => {
  res.json({ image: req.file.location });
};

export const uploadImages = (req, res, next) => {
  const uploadFiles = [];
  for (const file of req.files) {
    console.log(file, "file");
    uploadFiles.push(file.location);
  }

  res.json({ data: uploadFiles });
};

export const showImage = (req, res, next) => {
  const key = req.params.filename;
  const readStream = getFileStream(key);

  return readStream.pipe(res);
};
