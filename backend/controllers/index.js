'use strict';

const { Server } = require('ws');
const apiCrawler = require('../lib/apiCrawler');

module.exports = function(app) {
    // setup websocket server
    const wss = new Server({ port: parseInt(process.env.WS_PORT, 10)}, () => {
        console.log(`WebSocket server started on port: ${process.env.WS_PORT}`);
    });

    app.get('/rates', async (req, res) => {
        try {
            const apiRes = await apiCrawler;
            const rateData = JSON.stringify(apiRes.data);

            res.send(rateData);
        } catch (e) {
            console.error(e);
        }
    });

    wss.on('connection', ws => {
        console.log('WS connection established');
        ws.send('status=OK');

        // check for auth
        ws.on('message', (msg) => {
            if (msg === `auth=${process.env.SERVER_AUTH_KEY}`) {
                // send new exhange rate data every 60 seconds
                setInterval(async () => {
                    try {
                        const apiRes = await apiCrawler;
                        const rateData = JSON.stringify(apiRes.data);
            
                        ws.send(rateData);
                    } catch (e) {
                        console.error(e);
                    }
                }, 6000000);
            } else {
                ws.send('auth=Fail');
            }
        });
    });

};