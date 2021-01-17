const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  address: {
    type: String,
  },
  locality: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  phone1: {
    type: String,
  },
  phone2: {
    type: String,
  },
  services: {
    type: String,
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  twitter: {
    type: String,
  },
  linkedin: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.plugin(uniqueValidator, { message: "Email already in Use" });

UserSchema.method("toJSON", function () {
  const { _v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
