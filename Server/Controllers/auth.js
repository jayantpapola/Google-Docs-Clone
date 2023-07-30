const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email: email });
    const saltRounds = 10;
    if (!userExist) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        const newUser = new User({
          name: name,
          email: email,
          password: hash,
        });
        newUser.save();
        const token = jwt.sign(
          { name: name, email: email },
          process.env.SECRET_KEY
        );
        res.status(200).send({ success: true, data: req.body, token: token });
      });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.send(err);
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email: email });
  if (!userExist) {
    return res.status(200).send({ error: { email: "email not found" } });
  } else {
    bcrypt.compare(password, userExist.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          { name: userExist.name, email: email },
          process.env.SECRET_KEY
        );
        return res
          .status(200)
          .send({ success: true, data: req.body, token: token });
      } else {
        return res
          .status(200)
          .send({ error: { password: "Incorrect Password" } });
      }
    });
  }
};

module.exports = {
  signUp,
  logIn,
};
