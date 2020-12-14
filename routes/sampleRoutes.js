const passport = require('passport');
const mongoose = require('mongoose');
const Sample = mongoose.model('sample');

const jsonTemplate = require('../utils/jsonTemplate');

module.exports = (app) => {
  app.post(
    '/samples/create',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        const { nama_sampel, varianPengujian } = req.body;
        const sample = await new Sample({
          nama_sampel,
          varianPengujian,
        }).save();

        if (sample) {
          res.send(jsonTemplate(200, 'Data sampel berhasil dibuat'));
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
    '/samples',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        const sample = await Sample.find().exec();

        if (sample) {
          res.send(
            jsonTemplate(200, 'Berhasil mendapatkan data sampel', sample),
          );
        } else {
          res
            .status(400)
            .send(jsonTemplate(400, 'Gagal mendapatkan data sampel'));
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
    '/samples/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        const { id } = req.params;

        const sample = await Sample.findById(id).exec();

        if (sample) {
          res.send(
            jsonTemplate(200, 'Berhasil mendapatkan data sampel', sample),
          );
        } else {
          res
            .status(400)
            .send(jsonTemplate(400, 'Gagal mendapatkan data sampel'));
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
    '/samples/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        const { id } = req.params;
        const { nama_sampel, varianPengujian } = req.body;

        const sample = await Sample.findByIdAndUpdate(
          id,
          {
            nama_sampel,
            varianPengujian,
          },
          { new: true },
        ).exec();

        if (sample) {
          res.send(
            jsonTemplate(200, 'Berhasil mengupdate data sampel', sample),
          );
        } else {
          res
            .status(400)
            .send(jsonTemplate(400, 'Gagal mengupdate data sampel'));
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
    '/samples/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        const { id } = req.params;

        const sampel = await Sample.findByIdAndDelete(id).exec();

        if (sampel) {
          res.send(jsonTemplate(200, 'Berhasil menghapus data sampel'));
        } else {
          res
            .status(400)
            .send(jsonTemplate(400, 'Gagal menghapus data sampel'));
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
