import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

//config
const storage = multer.diskStorage({
  //destination func
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  //filename func
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

//check file type func
const checkFileType = function (file, cb) {
  //check file types expression
  const fileTypes = /jpg|jpeg|png|webp/;
  //extname
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    cb(null, true);
  } else {
    cb("Images only. jpg, jpeg, png, webp");
  }
};

//upload middleware
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    //validate file types function
    checkFileType(file, cb);
  },
});

//upload endpoint
router.post("/", upload.single("image"), (req, res) => {
  //send the img path
  res.send(`/${req.file.path}`);
});

export default router;
