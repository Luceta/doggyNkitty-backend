import randomstring from "randomstring";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
aws.config.loadFromPath(__dirname + "/../config/s3Info.json");

const s3 = new aws.S3();
const bucket = "doggy-n-kitty";

export const upload = multer({
  storage: multerS3({
    s3,
    bucket,
    acl: "public-read-write",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const filename = file.originalname;
      const fileExtension = file.mimetype.split("/")[1];
      const prefix = randomstring.generate();
      if (!["png", "jpg", "jpeg", "gif", "bmp"].includes(fileExtension)) {
        return cb(new Error("Only images are allowed"));
      }
      cb(null, `upload/${prefix}+${filename}`);
    },
  }),
});

export const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: `upload/${fileKey}`,
    Bucket: bucket,
  };

  return s3.getObject(downloadParams).createReadStream();
};
