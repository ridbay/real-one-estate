const config = require("./db.config");
const mongoose = require("mongoose");

//Remove MongoDB warning error
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

// mongoose.Promise = global.Promise;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(config.URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connected to DB!!!");
  } catch (e) {
    console.log("Can not connect to DB!!!");
    process.exit();
    // throw e;
  }
};

module.exports = InitiateMongoServer;
