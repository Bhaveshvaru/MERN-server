const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/auth');

const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require('../validators');

router.post('/signin', validateSigninRequest, isRequestValidated, signin);
router.post('/signup', validateSignupRequest, isRequestValidated, signup);

module.exports = router;
