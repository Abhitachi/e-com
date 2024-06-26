import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

//multer provides methods to generate middleware that process file uploads

//diskStorage used to store files on local system and to determine the destination directory and file name.
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb({ message: "Images only!" });
  }
}

const upload = multer({
  storage,
});

router.post("/", upload.single("image"), (req, res) => {
  const imagePath = `/${req.file.path}`.replace(/\\/g, "/");
  res.send({
    message: "Image uploaded successfully",
    image: imagePath,
  });
});

export default router;
