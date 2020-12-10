const mongoose = require('mongoose');
const passport = require('passport');
const axios = require('axios');

const Examination = mongoose.model('examination');
const jsonTemplate = require('../utils/jsonTemplate');
const option = require('../utils/axiosSetting');
const { json } = require('body-parser');

module.exports = (app) => {
  app.post(
    '/examination/create',
    passport.authenticate('jwt', { session: false }, async (req, res) => {
      const { _id } = req.user;
      const { item, total_harga };
      try {
        // Buat invoice terlebih dahulu

        // Generate Invoice Code & Kode Pemeriksaan
        invoice_code = 'XXX';
        kode_pemeriksaan = 'YYY';

        const invoice = await axios.post(
          '/invoices/create',
          {
            invoice_code,
            item,
            total_harga,
          },
          option(),
        );

        if (invoice) {
          const invoice_id = invoice._id;
          const newExamine = new Examination({
            _userID: _id,
            kode_pemeriksaan,
            _invoiceID: invoice_id,
          }).save();

          if (newExamine) {
            res.send(jsonTemplate(200, 'Data pemeriksaan berhasil dibuat .'));
          } else {
            res
              .status(400)
              .send(
                jsonTemplate(
                  400,
                  'Terjadi kesalahan ketika membuat data pemeriksaan .',
                ),
              );
          }
        } else {
          res
            .status(400)
            .send(
              jsonTemplate(400, 'Terjadi kesalahan ketika membuat invoice .'),
            );
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
    }),
  );
};
