const { ObjectID } = require('bson');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const pemeriksaanSchema = new Schema({
  _userID: { type: ObjectID, ref: 'user', required: true },
  kode_pemeriksaan: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'proses', 'selesai'],
    default: 'pending',
    required: true,
  },
  _invoiceID: { type: ObjectID, ref: 'invoice', required: true },
});

mongoose.model('examination', pemeriksaanSchema);
