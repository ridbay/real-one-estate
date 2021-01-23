const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PropertySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  publishedStatus: {
    type: Boolean,
    required: true,
  },
  marketStatus: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  locality: {
    type: String,
  },
  state: {
    type: String,
  },
  area: {
    type: String,
  },
  budget: {
    type: String,
  },
  bedroom: {
    type: String,
  },
  toilet: {
    type: String,
  },
  bathroom: {
    type: String,
  },
  parking: {
    type: String,
  },
  totalArea: {
    type: String,
  },
  video: {
    type: String,
  },
  image: {
    type: String,
  },
  serviced: {
    type: String,
  },
  furnished: {
    type: String,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
 },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


PropertySchema.method("toJSON", function () {
  const { _v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

// export model Property with PropertySchema
module.exports = mongoose.model("property", PropertySchema);
