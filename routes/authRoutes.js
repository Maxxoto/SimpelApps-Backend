const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const jsonTemplate = require('../utils/jsonTemplate');
const keys = require('../config/keys');
const User = mongoose.model('user');

module.exports = (app) => {
  const hashPassword = async (password) => {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
    return hashedPassword;
  };

  app.get('/auth', (req, res) => {
    res.send('Authentication service is healthy ');
  });

  app.post('/auth/register', async (req, res) => {
    const {
      email,
      password,
      nama_lengkap,
      nama_instansi,
      alamat,
      no_hp,
      role,
    } = req.body;
    try {
      const existingUser = await User.findOne({
        email: email.toLowerCase(),
      }).exec();

      if (existingUser) {
        res.status(400).send(400, 'Email sudah terdaftar !');
      } else {
        const newUser = new User({
          email: email.toLowerCase(),
          hash: await hashPassword(password),
          nama_lengkap,
          nama_instansi,
          alamat,
          no_hp,
          hak_akses: role || 'user',
        });

        newUser.save();
        res.send(jsonTemplate(200, 'Berhasil mendaftar .'));
      }
    } catch (error) {
      res.status(500).send(jsonTemplate(500, error));
    }
  });

  app.post(
    '/auth/login',
    passport.authenticate('local', { session: false }),
    async (req, res) => {
      const { _id, email, hak_akses } = req.user;
      // const role = hak_akses || 'user';
      try {
        const token = jwt.sign({ data: _id }, keys.secret, {
          expiresIn: 604800000,
          issuer: 'simpelapps',
          audience: 'api.simpelapps.web.id',
        });
        res.send(jsonTemplate(200, 'Berhasil login', { email, token }));
      } catch (error) {
        res.status(400).send(400, 'Login gagal !');
      }
    },
  );

  app.get(
    '/users/me',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.send(req.user);
    },
  );
};
