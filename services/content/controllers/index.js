const { ContentModel } = require('../database/models');

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
};
