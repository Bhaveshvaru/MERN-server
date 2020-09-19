const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//config env variables
dotenv.config();

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connected to database
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(`MongoDB Connected`);
};
connectDB();

app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'hello there!',
  });
});

app.post('/', (req, res, next) => {
  res.status(200).json({
    message: req.body,
  });
});

//listning of server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}...`);
});