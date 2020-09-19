const express = require('express');
const app = express();
const dotenv = require('dotenv');

//config env variables
dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}...`);
});
