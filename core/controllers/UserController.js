import { omit } from 'lodash'
const User = require("../models/User");
const registerValidator = require("../validation/register.validation");
const loginValidator = require("../validation/login.validation");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const tokenForUser = (user)  => {
  const data = omit(user, 'password');
  const expiresIn = 60*60*24*30;
  const algorithm = process.env.JWT_ALGORITHM || 'HS256';
  return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn, algorithm });
}
/**
 * @route   POST api/users/register
 * @des     Return current user
 */
module.exports.register = async (req, res, next) => {
  try {
    //Validate input
    const { body } = req;
    const { firstName, lastName, password } = body;
    let { email } = body;

    //validate inputs
    const { isValid, errors } = registerValidator.prettyValidate(body);
    if (!isValid) {
      throw createError(422, errors[0]);
    }

    //pretty email
    email = email.toLowerCase();
    email = email.trim();

    //find user
    const user = await User.findOne({ email: email });
    if (user) {
      throw createError(400, "Email already exists");
    }

    //Create new user
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email
    });
    newUser.password = newUser.generateHash(password);

    //Save user to database
    const savedUser = await newUser.save();
    res.status(200).json({ success: true, token: tokenForUser(savedUser) });
  } catch (e) {
    next(e);
  }
};

/**
 * @route   POST api/users/login
 * @des     Return JWT token
 */
module.exports.login = async (req, res, next) => {
  try {
    //Validate input
    const { body } = req;
    const { password } = body;
    let { email } = body;

    //validate inputs
    const { isValid, errors } = loginValidator.prettyValidate(body);
    if (!isValid) {
      throw createError(422, errors[0]);
    }

    //Find user
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404, "User not found");
    }
    //check password
    if (!user.validPassword(password)) {
      throw createError(400, "Wrong password");
    }

    //user match
    res.status(200).json({ success: true, token: tokenForUser(user) });
  } catch (e) {
    next(e);
  }
};

module.exports.info = async (req, res, next) => {
  res.send("aa")
}
