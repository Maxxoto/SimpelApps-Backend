const mongoose = require('mongoose');
const passport = require('passport');
const axios = require('axios');

const Invoice = mongoose.model('invoice');
const jsonTemplate = require('../utils/jsonTemplate');
const nanoid = require('nanoid/non-secure');

module.exports = (app) => {
  app.post(
    '/invoices/create',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        const { item, total_harga } = req.body;

        const year = new Date().getFullYear();
        const uniqueCode = nanoid.customAlphabet('1234567890', '5');
        const invoice_code = `INV/${year}/${uniqueCode()}`;

        const invoice = await new Invoice({
          invoice_code,
          _itemID: item,
          total_harga,
        }).save();

        if (invoice) {
          res.send(jsonTemplate(200, 'Data invoice berhasil dibuat', invoice));
        }
      } catch (error) {
        res
          .status(400)
          .send(
            jsonTemplate(
              400,
              `Terjadi kesalahan , silahkan ulangi beberapa saat lagi . \n Error : ${error}`,
            ),
          );
      }
    },
  );

  app.get(
    '/invoices',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        const invoice = await Invoice.find().populate('_itemID').exec();

        if (invoice) {
          res.send(
            jsonTemplate(200, 'Berhasil mendapatkan data invoice', invoice),
          );
        } else {
          res
            .status(400)
            .send(jsonTemplate(400, 'Gagal mendapatkan data invoice'));
        }
      } catch (error) {
        res
          .status(400)
          .send(
            jsonTemplate(
              400,
              `Terjadi kesalahan , silahkan ulangi beberapa saat lagi . \n Error : ${error}`,
            ),
          );
      }
    },
  );

  app.get(
    '/invoices/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        const { id } = req.params;

        const invoice = await Invoice.findById(id).exec();

        if (invoice) {
          res.send(
            jsonTemplate(200, 'Berhasil mendapatkan data invoice', invoice),
          );
        } else {
          res
            .status(400)
            .send(jsonTemplate(400, 'Gagal mendapatkan data invoice'));
        }
      } catch (error) {
        res
          .status(400)
          .send(
            jsonTemplate(
              400,
              `Terjadi kesalahan , silahkan ulangi beberapa saat lagi . \n Error : ${error}`,
            ),
          );
      }
    },
  );

  app.put(
    '/invoices/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        const { id } = req.params;
        const { status } = req.body;

        const invoice = await Invoice.findByIdAndUpdate(
          id,
          { status },
          { new: true },
        ).exec();

        if (invoice) {
          res.send(
            jsonTemplate(200, 'Berhasil mengupdate data invoice', invoice),
          );
        } else {
          res
            .status(400)
            .send(jsonTemplate(400, 'Berhasil mengupdate data invoice'));
        }
      } catch (error) {
        res
          .status(400)
          .send(
            jsonTemplate(
              400,
              `Terjadi kesalahan , silahkan ulangi beberapa saat lagi . \n Error : ${error}`,
            ),
          );
      }
    },
  );

  app.delete(
    '/invoices/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        const { id } = req.params;
        const invoice = await Invoice.findByIdAndDelete(id).exec();

        if (invoice) {
          res.send(jsonTemplate(200, 'Berhasil menghapus data invoice'));
        } else {
          res
            .status(400)
            .send(jsonTemplate(400, 'Gagal menghapus data invoice'));
        }
      } catch (error) {
        res
          .status(400)
          .send(
            jsonTemplate(
              400,
              `Terjadi kesalahan , silahkan ulangi beberapa saat lagi . \n Error : ${error}`,
            ),
          );
      }
    },
  );
};
