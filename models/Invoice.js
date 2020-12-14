const { ObjectID } = require('bson');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const invoiceSchema = new Schema({
  invoice_code: { type: String, required: true, unique: true },
  _itemID: [{ type: ObjectID, ref: 'sample', required: true }],
  status: {
    type: String,
    enum: ['pending', 'proses', 'lunas'],
    default: 'pending',
    required: true,
  },
  total_harga: { type: Number, required: true },
});

mongoose.model('invoice', invoiceSchema);
