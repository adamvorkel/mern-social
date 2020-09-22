const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const connect = async () => {
  try {
    await mongoose.connect(db, options);
    console.log(`Connected to database at URI ${db}`);
  } catch (error) {
    console.error(`Failed to connect to database at URI ${db}`);
    process.exit(1);
  }
};

module.exports = connect;
