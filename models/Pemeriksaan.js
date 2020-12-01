const { ObjectID } = require('bson');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const pemeriksaanSchema = new Schema({
  nama_instansi: String,
  jenis_usaha: String,
  status: { type: String, enum: ['pending', 'proses', 'selesai'] },
  _invoiceID: { type: ObjectID, ref: 'invoice', required: true },
});

mongoose.model('pemeriksaan', pemeriksaanSchema);
