const multer = require("multer"); //для переобразования файлов
const path = require("path");

const tempDir = path.join(process.cwd(), "temp"); //process.cwd-путь к корневой папке файла

//настройки multer
const storageSettings = multer.diskStorage({
  //куда сохранить файл
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  //под каким именем сохранить файл
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  //макс размер файла
  limits: {
    fileSize: 2000000,
  },
});

//создание мидлвары
const uploadMiddleware = multer({
  storage: storageSettings,
});

module.exports = uploadMiddleware;
