const { ObjectID } = require('bson');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const invoiceSchema = new Schema({
  invoice_code: { type: String, required: true },
  _itemID :[{type:ObjectID,ref='sampel',required:true}],
  status: {type:String,enum:['pending','proses','lunas']},
  harga_total:Number
});

mongoose.model('invoice', invoiceSchema);
