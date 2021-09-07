const { users: service } = require("../../services");
// const { sendMail } = require("../../utils");

const signup = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await service.getOne({ email });
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Already registered",
      });
    }

    const verifyToken = "12345dfedf"; //создали токен
    // await service.update(_id, { verifyToken }); //записали токен в базу
    const registeredUserData = await service.add({ ...req.body, verifyToken });
    console.log(registeredUserData);
    const { URL } = process.env;

    console.log(registeredUserData.email);

    // создаем еmail со ссылкой на адрес сайта с роутом верификации
    const emailToSend = {
      to: registeredUserData.email,
      subject: "test verify",
      html: `<a href="${URL}/api/v1/auth//verify/${verifyToken}" target="_blank">Verify your email please<a/>`,
    };
    await sendMail(emailToSend); //отправляем письмо юзеру
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Successfully registered. Please verify your email!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
