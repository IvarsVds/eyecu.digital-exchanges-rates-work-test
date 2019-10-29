'use strict';

const axios = require('axios');

module.exports = axios.get(`${process.env.API_URL}`, {
    headers: {
        'authorization': `Apikey ${process.env.API_KEY}`
    }
});