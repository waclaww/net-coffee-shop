require("dotenv").config();
const express = require("express");
const cors = require('cors');
const apiRouter = require('./src/routes/index')

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(express.json());

app.use('/api', apiRouter)


app.listen(3000)