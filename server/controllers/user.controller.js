const db = require("../models");
const userSchema = require("../utils/userValidation");
const Users = db.users;
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/jwtToken");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// @addUser
const createUser = async (req, res) => {
  let user = {
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    password: await bcrypt.hash(req.body.password, 10),
  };
  const tokenValue = generateToken(user);
  user.token = tokenValue;
  if (userSchema.validate(user).error) {
    res.status(200).send({
      error: userSchema.validate(user).error.details[0].message.toString(),
    });
  } else {
    const isPresent = await Users.findOne({
      where: { email: user.email },
    });
    if (isPresent === null) {
      await Users.create(user).then(() => {
        const msg = {
          to: user.email,
          from: "sandiplondhe53@gmail.com",
          subject: "Task Manager",
          text: "You have successfully registered !",
          html: "<strong>You have successfully registered !</strong>",
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
        return res.status(200).send({
          success: `Registration completed Successfully`,
          token: user.token,
        });
      });
    } else {
      res.status(200).send({
        error: "user with email id is already exist",
      });
    }
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input are required");
    }
    const user = await Users.findOne({
      where: { email: email },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const tokenValue = generateToken(req.body);
      user.token = tokenValue;
      res.status(200).send({
        success: `Logged Successfully`,
        token: `${user.token}`,
      });
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUser,
  loginUser,
};
