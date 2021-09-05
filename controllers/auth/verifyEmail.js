const { users: service } = require("../../services");

const verifyEmail = async (req, res, next) => {
  try {
    const { verifyToken } = req.params; //считываем токен юзера
    const user = await service.getOne({ verifyToken }); //ищем юзера с таким токеном
    if (!user) {
      //если такого юзера нет - 404
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    //если юзер есть - обновляем юзера и подтверждаем что он верифицирован
    await service.update(user._id, { verify: true, verifyToken: null });
    res.json({
      status: "success",
      code: 200,
      message: "Verification successfull",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
