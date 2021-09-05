const mongoose = require("mongoose"); //для подключения к бд
const express = require("express"); //для создания роутов
const path = require("path"); //модуль для создания путей
const cors = require("cors"); // для кроссдоменных запросов
require("dotenv").config(); // для использования .env
const app = express(); //для создания сервера
const api = require("./api");

const { DB_HOST, PORT = 3000 } = process.env;

//первый аргумент - строка подключения к бд, второй аргумент - обьект с настройками подключения
mongoose
  .connect(DB_HOST, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Server running on port ${PORT}`);
    app.listen(PORT);
  })
  .catch((error) => console.log(error));

app.use(cors());
app.use(express.json()); //чтобы тело запроса приходило не undefined(в любом случае, будет приходить строка)

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "avatars")));

const usersDir = path.join(process.cwd(), "/public/avatars"); // путь к папке для аватара
app.use("/avatars", express.static(usersDir)); //раздача статики

app.use("/api/v1/auth", api.auth);
app.use("/api/v1/contacts", api.contacts);

app.use((_, res) => {
  res.status(404).send({
    status: "error",
    code: 404,
    message: "Not found",
  });
});

app.use((error, _, res, __) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({
    status: "error",
    code: status,
    message,
  });
});

module.exports = app;

// //настройки multer
// const storageSettings = multer.diskStorage({
//   //куда сохранить файл
//   destination: (req, file, cb) => {
//     cb(null, tempDir);
//   },
//   //под каким именем сохранить файл
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, file.originalname);
//   },
//   //макс размер файла
//   limits: { fileSize: 2000000 },
// });
// //создание мидлвары
// const uploadMiddleware = multer({
//   storage: storageSettings,
// });

// app.post(
//   "/upload",
//   uploadMiddleware.single("avatar"),
//   async (req, res, next) => {
//
//     if (req.file) {
//       console.log(req.file);
//       const { file } = req;
//       console.log({ file });
//       const img = await jimp.read(file.path);
//       await img
//         .autocrop()
//         .cover(
//           250,
//           250,
//           jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
//         )
//         .writeAsync(file.path);
//       await fs.rename(file.path, path.join(usersDir, file.originalname));
//       console.log(file.path);
//
//     }
//     res.redirect("/");
//   }
// );
