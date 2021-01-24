const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const InitiateMongoServer = require("./config/db");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
  // console.trace(process.env.NODE_ENV)
  res.status(200).json({ message: "Welcome to real one estate." });
});

require("./routes/user.route")(app);
require("./routes/property.route")(app);

app.all("*",(req,res)=>{
  res.send("Invalid Route")
})

// Initiate Mongo Server
InitiateMongoServer();
// set port, listen for requests
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
