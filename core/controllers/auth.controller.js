import registerValidator from '../validation/register.validation'
import loginValidator from '../validation/login.validation'
import createError from 'http-errors'
import UserService from '../services/user.service'

/**
 * @route   POST api/auth/signup
 * @des     Return current user
 */
module.exports.signup = async (req, res, next) => {
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
    const user = await UserService.findByEmail(email)
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
    res.status(200).json({ success: true, token: UserService.tokenForUser(savedUser) });
  } catch (e) {
    next(e);
  }
};

/**
 * @route   POST api/auth/login
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


/**
 * @route   POST api/auth/forgot-password
 * @des     Return JWT token
 */
module.exports.forgotPassword = async (req, res, next) => {

}


/**
 * @route   POST api/auth/reset-password
 * @des     Return JWT token
 */
module.exports.resetPassword = async (req, res, next) => {

}
