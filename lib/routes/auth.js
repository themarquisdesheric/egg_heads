const router = require('express').Router();
const User = require('../models/user');
const ensureAuth = require('../auth/ensure-auth')();
const tokenService = require('../auth/token-service');

function hasEmailAndPassword(req, res, next) {
  const user = req.body;
  if (!user.email || !user.password) {
    return next({ code: 401, error: 'email and password required' });
  }
  next();
}

router
  .get('/verify', ensureAuth, (req, res) => {
    res.send({ valid: true });
  })

  .post('/signup', hasEmailAndPassword, (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const chef = req.body.chef;
    delete req.body.password;

    User.exists({ email })
      .then(exists => {
        if (exists) { throw { code: 400, error: 'username already exists' }; }

        const user = new User({ email, chef});
        user.generateHash(password);
        return user.save();
      })
      .then(user => tokenService.sign(user))
      .then(token => res.send({ token }))
      .catch(next);
  })

  .post('/signin', hasEmailAndPassword, (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    delete req.body.password;

    User.findOne({ email })
      .then(user => {
        if (!user || !user.comparePassword(password)) {
          throw { code: 401, error: 'invalid email or password' };
        }
        return user;
      })
      .then(user => tokenService.sign(user))
      .then(token => res.send({ token }))
      .catch(next);
  });

module.exports = router;