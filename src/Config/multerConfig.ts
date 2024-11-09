import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb) => {
    const uploadPath = path.join(__dirname, `../Uploads/${req.user._id}`);
    console.log(uploadPath)
    fs.mkdirSync(uploadPath, {
      recursive: true,
    });
    cb(null, uploadPath);
  },

  filename: (req: any, file: any, cb) => {
    const date = Date.now();
    const filename = date + path.extname(file.originalname);
    if (!req.filenames) {
      req.filenames = [];
    }
    req.filenames.push(filename);
    cb(null, filename);
  },
});

const uploadImage = multer({
  fileFilter: (req: any, file: any, cb) => {
    const allowedMimeTypes = ["image/jpg", "image/png", "image/jpeg"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      //   cb(new Error("Only .png, .jpg, and .jpeg files are allowed"), false);
      cb(new Error("Only .png, .jpg, and .jpeg files are allowed"));
    }
  },

  
  limits: { fileSize: 10000000 },
  storage: storage,
});

const uploadFile = multer({
  fileFilter: (req: any, file: any, cb) => {
    const allowedExtensions = [".pdf", ".doc", ".docx", ".txt"];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    if (allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('Only .pdf, .doc, .docx, and .txt files are allowed')); 
    }
  },
  limits: { fileSize: 10000000 },
  storage: storage,
});

const document = multer({
  fileFilter: (req, file, cb) => {
    const allowedImageMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
    const allowedDocumentExtensions = [".pdf", ".doc", ".docx", ".txt"];

    if (allowedImageMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const fileExtension = path.extname(file.originalname).toLowerCase();
      if (allowedDocumentExtensions.includes(fileExtension)) {
        cb(null, true);
      } else {
        cb(new Error('Only .png, .jpg, .jpeg, .pdf, .doc, .docx, and .txt files are allowed'));
      }
    }
  },
  limits: { fileSize: 10000000 },
  storage: storage,
});


export default {
  uploadImage,
  uploadFile,
  document
}
