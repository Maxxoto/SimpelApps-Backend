const mongoose = require('mongoose');

const { Schema } = mongoose;

const sampelSchema = new Schema({
  name_sampel: String,
  varianObject: [{ type: Object, required: true }],
});

mongoose.model('sampel', sampelSchema);
