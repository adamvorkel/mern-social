const express = require('express');
const connect = require('./db');

const app = express();

// connect to db
connect();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
