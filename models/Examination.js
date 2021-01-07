const mongoose = require('mongoose');

const { Schema } = mongoose;

const pemeriksaanSchema = new Schema({
  _userID: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  kode_pemeriksaan: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'proses', 'selesai'],
    default: 'pending',
    required: true,
  },
  _invoiceID: { type: Schema.Types.ObjectId, ref: 'invoice', required: true },
});

mongoose.model('examination', pemeriksaanSchema);
