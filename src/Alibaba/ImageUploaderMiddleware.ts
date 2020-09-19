import OSS from "ali-oss";
import { result } from "lodash";
import httpStatus from "http-status";

// User Logon Name eboves-bucket@5699298335749620.onaliyun.com
// AccessKey ID LTAI4GAnQkd5wJqFqY4wzxf1
// AccessKey Secret LZFQWAKFdxxtJ4a480qeoQDWCMo5f1

const client = new OSS({
  region: "oss-ap-south-1",
  accessKeyId: "LTAI4GAnQkd5wJqFqY4wzxf1",
  accessKeySecret: "LZFQWAKFdxxtJ4a480qeoQDWCMo5f1",
  bucket: "eboves",
  secure: true,
});

const sendUploadToGCS = async (req, res, next) => {
  if (!req.file) {
    req.isFile = false;
    return next();
  }

  req.isFile = true;

  client
    .put(
      `${(req.body.folder ? req.body.folder : "") + req.file.originalname}`,
      req.file.buffer
    )
    .then((result) => {
      req.file.url = result.url;
      delete req.file.buffer;
      return res.status(httpStatus.OK).json({ data: req.file });
    })
    .catch((err) => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error while uploading image" });
      return;
    });
};

export default sendUploadToGCS;
