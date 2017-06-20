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
                resolve(body);
            } else {
                console.error(`🚒 Error getCatFacts: ${err}`);
                reject(err);
            }
        });
    });
}




/**
 * Gets cat photos from designated API
 *
 * @return {Promise}
 * Returns a promise.
 */
function getCatPhotos() {
    return new Promise((resolve, reject) => {
        /**
        * We are building our URL using environment variables.
        *
        * Unless we change our PICS_ENDPOINT env var, the URL is:
        * https://nijikokun-random-cats.p.mashape.com/random/kitten
        *
        * To see how this is done, check out code-examples/config.js
        *
        * Note: A key is needed to use this free API.
        */
        // TODO: update to: http://thecatapi.com/docs.html#get
        let options = {
            url: config.get('picsEndpoint'),
            headers: {
                'X-Mashape-Key': config.get('PHOTO_KEY')
            }
        };

        request(options, (err, res, body) => {
            if (!err) {
                resolve(body);
            } else {
                console.error(`🚒 Error getCatPhotos: ${err}`);
                reject(err);
            }
        });
    });
}


module.exports = {
    facts: getCatFacts,
    photos: getCatPhotos
};
