import * as gcs from "@google-cloud/storage";
import path from "path";
import config from "../config";
import httpStatus from "http-status";
const GOOGLE_CLOUD_KEYFILE = path.join(__dirname, "./projectCrediential.json"); //

const storage = new gcs.Storage({
  projectId: config.googleCloudProjectID,
  keyFilename: GOOGLE_CLOUD_KEYFILE,
});

export const getPublicUrl = (bucketName: string, fileName: string) =>
  `https://storage.googleapis.com/${bucketName}/${fileName}`;

const sendUploadToGCS = async (req, res, next) => {
  if (!req.file) {
    req.isFile = false;
    return next();
  }

  req.isFile = true;

  const bucket = storage.bucket(config.bucketName);
  const blob = bucket.file(
    (req.body.folder ? req.body.folder : "")  + req.file.originalname
  );
  blob
    .createWriteStream({
      resumable: false,
      // predefinedAcl: "publicRead",
      metadata: {
        contentType: req.file.mimetype,
      },
    })
    .on("finish", async () => {
      req.file.url = `https://storage.googleapis.com/${config.bucketName}/${
        req.body.folder ? req.body.folder : ""
      }${req.file.originalname}`;

      res.status(httpStatus.OK).json({ data: req.file });
      // next();
    })
    .on("error", (err) => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error while uploading image" });
      return;
    })
    .end(req.file.buffer);
};

export default sendUploadToGCS;
