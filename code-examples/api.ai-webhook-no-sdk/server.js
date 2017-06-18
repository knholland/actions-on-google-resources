'use strict';

const bodyParser = require('body-parser'),
    express = require('express'),
    pkg = require('./package.json'),
    server = express(),
    webhook = require('./lib/webhook');

server.use(bodyParser.json());

server.set('port', process.env.PORT);

server.get('/healthcheck', (req, res) => {
    res.send(pkg.version);
});

server.post('/webhook', (req, res) => {
    console.log(req.body);

    webhook(req).then(
        (data) => {
            console.log(`Response: ${data}`);
            res.json(data);
        }
    ).catch((error) => {
        console.error(`🚒 Error on webhook return: ${error}`);
        res.send('Error');
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});
