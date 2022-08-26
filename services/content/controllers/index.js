const { ContentModel } = require('../database/models');
const  parseCSV = require('../scripts/ingestion');
const { USER_SERVICE } = require('../config');

const axios = require('axios');

module.exports = {
  getBooksAsContent : async (req, res)=>{
    try {
      const data = await ContentModel.find();
      return res.status(200).json(data);
    }
    catch(err){
      return res.json({ error:'Unable to fetch content' });
    }
  },

  getTopContent : async(req, res)=>{
    try {
      const data = await ContentModel.find().sort({ 'likes': 1 });
      return res.status(200).json(data);
    }
    catch(err){
      return res.json({ error:'Unable to fetch top content' });
    }
  },

  updateLike: async(req, res)=>{
    try{
      const { contentId } = req.params;
      const updatedContent = await ContentModel.findByIdAndUpdate(contentId,
        {
          $inc: { likes:1 },
        },
        { new: true });

      return res.status(200).json(updatedContent);
    }
    catch(err){
      return res.json({ error:'Unable to update the like count' });
    }
  },

  /* This method will ingest the contents of the demo.csv file present in the content
  microservice. The ingestion process will take help of the `ingestion.js` script.*/
  ingestCSV: async(req, res)=>{
    try {
      const result = await parseCSV();
      /* This apiResponse contains all the valid id's that are present in User Microservice
      database.
      */
      const apiResponse = await axios.post(`${USER_SERVICE}/ingest`, { parsedCSV : result });
      /* Filtering the CSV based on apiResponse so that the data can be added into Content Service's
      Database */

      const finalData = result.filter(item =>{
        return apiResponse.data.includes(item['user_id']) === true;
      });
      console.log(finalData);
      await ContentModel.insertMany(finalData);
      return res.json(finalData);

    }
    catch(err){
      console.log(err);
      return res.json({ error:'Unable to ingest the CSV' });
    }
  },
};
