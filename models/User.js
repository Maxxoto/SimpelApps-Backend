const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  hash: { type: String, required: true },
  hak_akses: { type: String, enum: ['admin', 'user'], default: 'user' },
  nama_lengkap: String,
  nama_instansi: String,
  alamat: String,
  no_hp: String,
});

mongoose.model('user', userSchema);
