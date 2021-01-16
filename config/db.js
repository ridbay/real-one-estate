const config = require("./db.config")
const mongoose = require("mongoose");

//Remove MongoDB warning error
mongoose.set("useCreateIndex", true);

mongoose.Promise = global.Promise;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(config.URI, {
      useNewUrlParser: true,
      useUnifiedTopology:true,
      useFindAndModify: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;