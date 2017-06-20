'use strict';

const bodyParser = require('body-parser'),
    express = require('express'),
    pkg = require('./package.json'),
    server = express(),
    webhook = require('./lib/webhook'),
    config = require('./config');

server.use(bodyParser.json());

server.set('port', config.get('PORT'));

server.get('/healthcheck', (req, res) => {
    res.send(pkg.version);
});

server.post('/webhook', (req, res) => {
    // console.log(req.body);
    // console.log('----------');
    // console.log(req.body.originalRequest.data.surface);
    // console.log(req.body.originalRequest.data.inputs);

    webhook(req).then(
        (data) => {
            console.log(`Response: ${JSON.stringify(data)}`);
            res.json(data);
        }
    ).catch((error) => {
        console.error(`🚒 Error on webhook return: ${error}`);
        res.send('Error');
    });
});

server.listen(config.get('PORT'), () => {
    console.log(`Server running on ${config.get('PORT')}`);
});
