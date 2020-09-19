const User = require('../../models/user');
const jwt = require('jsonwebtoken');

//signup
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user)
      return res.status(400).json({
        message: 'Admin Already exists!',
      });
    const { firstname, lastname, email, password } = req.body;
    const _user = new User({
      firstname,
      lastname,
      email,
      password,
      username: Math.random().toString(),
      role: 'admin',
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
          message: 'Admin created successfully!',
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password) && user.role === 'admin') {
        const token = jwt.sign({ _id: user._id }, process.env.JWT, {
          expiresIn: '1h',
        });
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(400).json({
          message: 'Invalid Password',
        });
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
