import OSS from "ali-oss";
import httpStatus from "http-status";

/*const client = new OSS({
  region: "oss-ap-south-1",
  accessKeyId: "SKADJFJjHiyKJ785bv65g",
  accessKeySecret: "SKADJFJjHiyKJ785bv65g",
  bucket: "eboves",
  secure: true,
});*/

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
