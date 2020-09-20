const User = require('../models/user');
const jwt = require('jsonwebtoken');
//signup
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

//signin
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) return res.status(400).json({ err });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT, {
          expiresIn: '1h',
        });
        const { _id, firstname, lastname, emai, role, fullname } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstname,
            lastname,
            emai,
            role,
            fullname,
          },
        });
      } else {
        return res.status(400).json({ message: 'Invalid Password!' });
      }
    } else {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  });
};

exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const user = jwt.verify(token, process.env.JWT);
  req.user = user;
  next();
  //jwt.decode
};
