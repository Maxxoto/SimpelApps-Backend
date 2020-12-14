const mongoose = require('mongoose');

const { Schema } = mongoose;

const sampelSchema = new Schema({
  nama_sampel: { type: String, required: true },
  varianPengujian: [{ type: Object, required: true }],
});

mongoose.model('sample', sampelSchema);
