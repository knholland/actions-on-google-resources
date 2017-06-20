'use strict';

const nconf = require('nconf');

nconf.env([
    'ENVIRONMENT',
    'FACTS_NUMBER',
    'FACTS_ENDPOINT',
    'PORT'
]);

// These are required to be set to start up
if (!nconf.get('ENVIRONMENT') || !nconf.get('PORT')) {
    console.error('Required environment variables are not set.');
    process.exit(1);
}

let config = {
    default: {
        factsNumber: nconf.get('FACTS_NUMBER') ? nconf.get('FACTS_NUMBER') : 1,
        factsEndpoint: nconf.get('FACTS_ENDPOINT') ? nconf.get('FACTS_ENDPOINT') : 'http://catfacts-api.appspot.com/api/facts?number='
    }
};

// load the correct config based on environment
switch (nconf.get('ENVIRONMENT').toLowerCase()) {
    case 'prod':
        nconf.defaults(config.prod);
        break;

    default:
        nconf.defaults(config.default);
}

// Load overrides that don't override anything, they fill in the blanks
nconf.overrides(config.default);

module.exports = nconf;
