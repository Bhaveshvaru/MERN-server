const express = require('express');
const router = express.Router();
const {
  signup,
  signin,
} = require('../../controllers/admin/auth');

const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require('../../validators/index');

router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);

module.exports = router;
