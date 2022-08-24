const validator = require('validator');
module.exports = {
  validate: (req, res, next) => {
    const { email, password } = req.body;
    const { isEmail, isStrongPassword } = validator;

    /* Validating the password and email based on the rules mentioned in
    the assignment */
    if(isEmail(email) && isStrongPassword(password, [
      {
        minLength:10,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
      },
    ])){
      return next();
    }
    return res.status(403).json({ error:'Not authorized' });
  },
};
