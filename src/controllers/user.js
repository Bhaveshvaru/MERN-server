const User = require('../models/user');

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user)
      return res.status(400).json({
        message: 'User Already exists!',
      });
    const { firstname, lastname, email, password } = req.body;
    const _user = new User({
      firstname,
      lastname,
      email,
      password,
      username: Math.random().toString(),
    });
    _user.save((err, data) => {
      if (err) {
        return res.status(400).json({
          message: 'Something Went Wrong!!',
          error: err,
        });
      }
      if (data) {
        return res.status(201).json({
          message: 'User created successfully!',
        });
      }
    });
  });
};
