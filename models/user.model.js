const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
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
