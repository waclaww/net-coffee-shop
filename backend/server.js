require("dotenv").config();
const express = require("express");
const path = require('path')
const cors = require('cors');
const apiRouter = require('./src/routes/index');


const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(express.json());

app.use('/static', express.static(path.join(__dirname, 'public/images')))
;

app.use('/api', apiRouter)


app.listen(process.env.PORT)