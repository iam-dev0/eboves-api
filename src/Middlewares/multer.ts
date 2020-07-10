import multer from "multer";
import path from "path";
// const uuid=require('uuid');

//Set The Storage Engine
// const storage = multer.diskStorage({
//   destination: './public/uploads/',
//   filename: function(req, file, cb){
//     cb(null,file.fieldname + '-' + Date.now() +uuid()+ path.extname(file.originalname));
//   }
// });


// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|jfif|octet-stream/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb("Error: Images Only!");
  }
}


export const upload= multer({
  storage: multer.memoryStorage(),
  fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  // fileFilter: function(req, file, cb){
  //   checkFileType(file, cb);
  // }
});



export default  upload;