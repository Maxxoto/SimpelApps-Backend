const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

userSchema.methods.verifyPassword = async function verifyPassword(password) {
  const verifyHash = await new Promise((resolve, reject) => {
    bcrypt.compare(password, this.hash, (err, verifiedPass) => {
      if (err) reject(err);
      resolve(verifiedPass);
    });
  });
  return verifyHash;
};

mongoose.model('user', userSchema);
