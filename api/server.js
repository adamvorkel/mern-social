const express = require('express');
const connect = require('./db');

// connect to db
connect();

// configure app and routes
const app = express();
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
const postsRoute = require('./routes/posts');
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/posts', postsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
