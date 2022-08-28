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
        return res.json({ error:'User with this emailID already exists' });
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

      /* Requesting another microservice (Content service) to update the like count
      for a particular content */
      const result = await axios.post(`${CONTENT_SERVICE}/like/${contentId}`);
      return res.status(200).json(result.data);
    }
    catch(err){
      return res.json({ error:'Unable to update the like count' });
    }
  },

  filterData: async(req, res)=>{
    try {
      const { parsedCSV } = req.body;

      /* Since, we can't use async inside the filter method. I have created promises array
      and made use of Promise.all() to get the final array that has the response of all
      the promises collectively */
      const promiseArray = parsedCSV.map(item=>{
        return UserModel.findById(item['user_id']);
      });
      const returnedPromiseArray = await Promise.all(promiseArray);
      const result = returnedPromiseArray.filter(item=>{
        return !!item === true;
      });
      console.log('gausdf', result);
      const filteredArrayContainingOnlyId = result.map(item=>{
        return item._id.toString();
      });
      // console.log(filteredArrayContainingOnlyId);
      return res.json(filteredArrayContainingOnlyId);

    } catch(err) {
      return res.json({ error:'Unable to ingest data into the database' });
    }
  },
};
