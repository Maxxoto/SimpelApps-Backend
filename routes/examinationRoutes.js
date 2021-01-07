const mongoose = require('mongoose');
const passport = require('passport');
const axios = require('axios');

const Examination = mongoose.model('examination');
const jsonTemplate = require('../utils/jsonTemplate');
const option = require('../utils/axiosSetting');
const nanoid = require('nanoid/non-secure');

module.exports = (app) => {
  app.post(
    '/examinations/create',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        const { _id } = req.user;
        const { item, total_harga } = req.body;
        const token = req.headers['authorization'];
        // Buat invoice terlebih dahulu

        // Generate Invoice Code & Kode Pemeriksaan

        const year = new Date().getFullYear();
        const uniqueCode = nanoid.customAlphabet('1234567890', '5');
        const kode_pemeriksaan = `KP/${year}/${uniqueCode()}`;

        const invoice = await axios.post(
          '/invoices/create',
          {
            item,
            total_harga,
          },
          option(token),
        );

        if (invoice) {
          const newExamine = await new Examination({
            _userID: _id,
            kode_pemeriksaan,
            _invoiceID: invoice.data.data._id,
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
              '400',
              `Terjadi kesalahan , silahkan ulangi beberapa saat lagi . \n Error : ${error}`,
            ),
          );
      }
    },
  );

  app.get(
    '/examinations',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        const data = await Examination.find()
          .populate('_userID')
          .populate('_invoiceID')
          .exec();

        if (data) {
          res.send(jsonTemplate(200, 'Berhasil mendapatkan data', data));
        } else {
          res.status(400).send(jsonTemplate(400, 'Gagal mendapatkan data'));
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
    '/examinations/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        const { id } = req.params;
        const data = await Examination.findById(id).exec();

        if (data) {
          res.send(jsonTemplate(200, 'Berhasil mendapatkan data', data));
        } else {
          res.status(400).send(jsonTemplate(400, 'Gagal mendapatkan data'));
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
    '/examinations/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        const { id } = req.params;
        const { status } = req.body;

        const data = await Examination.findByIdAndUpdate(
          id,
          { status },
          { new: true },
        ).exec();

        if (data) {
          res.send(jsonTemplate(200, 'Berhasil mengupdate data', data));
        } else {
          res.status(400).send(jsonTemplate(400, 'Gagal mengupdate data'));
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
    '/examinations/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        const { id } = req.params;
        const data = await Examination.findByIdAndDelete(id).exec();

        if (data) {
          res.send(jsonTemplate(200, 'Berhasil menghapus data pemeriksaan'));
        } else {
          res
            .status(400)
            .send(jsonTemplate(400, 'Gagal menghapus data pemeriksaan'));
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
