'use strict';

// load up env vars from .env file in root dir.
// if it fails, close server.
const dotenv = require('dotenv').config();
if (dotenv.error) process.exit(1);

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const controllers = require('./controllers');

const app = express();
app.use(cors());
app.use(helmet());
controllers(app);


const port = parseInt(process.env.PORT, 10);
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
