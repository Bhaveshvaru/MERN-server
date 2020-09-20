const express = require('express');
const router = express.Router();
const {
  signup,
  signin,
  requireSignin,
  validateSigninRequest,
} = require('../controllers/auth');

const { validateSignupRequest, isRequestValidated } = require('../validators');

router.post('/signin',validateSignupRequest,isRequestValidated, signin);

router.post(
  '/signup',
  validateSignupRequest,
  isRequestValidated,
  signup
);

module.exports = router;
