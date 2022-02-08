const express = require("express");
const cors = require("cors");

const app = express();

// express middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// use router call
app.use('/api/users', require("./routes/userRouter"));

module.exports = app;