const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

var userRouter = require('./routes/users');

app.use('/users',userRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));