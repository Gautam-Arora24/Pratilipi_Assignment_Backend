const mongoose = require('mongoose');
const { DB_URL } = require('../config/index');


module.exports = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB Connected 🚀');

  } catch (error) {
    console.log('Error ============');
    console.log(error);
    process.exit(1);
  }
};


