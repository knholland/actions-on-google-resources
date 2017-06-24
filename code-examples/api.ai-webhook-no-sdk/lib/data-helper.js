'use strict';

const config = require('../config'),
    request = require('request');

/**
 * Gets Cat Facts from designated API
 *
 * @return {Promise}
 * Returns a promise.
 */
function getCatFacts() {
    return new Promise((resolve, reject) => {
        /**
        * We are building our URL using environment variables.
        *
        * Unless we change these values using environment variables, the URL is:
        * http://catfacts-api.appspot.com/api/facts?number=
        *
        * To see how this is done, check out code-examples/config.js
        */
        request.get(`${config.get('factsEndpoint')}${config.get('factsNumber')}`, (err, res, body) => {
            if (!err) {
                resolve(JSON.parse(body).facts[0].details);
            } else {
                console.error(`🚒 Error getCatFacts: ${err}`);
                reject(err);
            }
        });
    });
}


module.exports = {
    facts: getCatFacts
};
