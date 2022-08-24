const { UserModel } = require('../database/models');
const { CONTENT_SERVICE } = require('../config');

const bcrypt = require('bcryptjs');
const axios = require('axios');

module.exports = {
  signup: async (req, res)=>{
    try {
      const { email, password } = req.body;
      const user = new UserModel({
        email,
        password,
      });

      const users = await UserModel.find({ email });

      if(users.length > 0){
        return res.status(400).json({ error:'User with this emailID already exists' });
      }

      // Storing the password in hashed form.
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
      user.password = hash;

      const userAdded = await user.save();
      return res.status(200).json(userAdded);
    }
    catch(err){
      return res.json({ error:'Unable to Signup in the platform' });
    }
  },

  like: async(req, res)=> {
    try {
      const { contentId } = req.params;
      console.log('sdfsdf', CONTENT_SERVICE);

      /* Requesting another microservice (Content service) to update the like count
      for a particular content */
      const result = await axios.post(`${CONTENT_SERVICE}/like/${contentId}`);
      return res.status(200).json(result.data);
    }
    catch(err){
      return res.json({ error:'Unable to update the like count' });
    }
  },
};
