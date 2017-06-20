'use strict';

process.env.DEBUG = 'actions-on-google:*';
const ApiAiApp = require('actions-on-google').ApiAiApp;
const functions = require('firebase-functions');
// const request = require('request');

// API.AI defined actions for each intent
const BYE = 'tell.bye';
const FACTS = 'tell.facts';
const HELP = 'tell.help';
const START = 'input.welcome';

const LINK_OUT_TEXT = 'Learn more';
const GOOGLE_LINK = 'https://www.google.com/about/';

const NO_INPUTS = [
    'I didn\'t hear that.',
    'If you\'re still there, say that again.',
    'We can stop here. See you soon.'
];

// Generate random numbers to randomize responses
function getRandomNumbers(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
}

exports.rightMeow = functions.https.onRequest((request, response) => {
    console.log('Request headers: ' + JSON.stringify(request.headers));
    console.log('Request body: ' + JSON.stringify(request.body));
    console.log('RESPONSE: ', response);

    const app = new ApiAiApp({ request, response });

    // Handles Bye Intent
    function bye (app) {
        if (app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)) {
            app.tell(app.buildRichResponse()
                .addSimpleResponse('Ok, bye!')
            );
        } else {
            app.tell('ok, bye');
        }
    }

    // TODO: Hook up to APIs
    // Handles Fact Intent
    function facts (app) {
        let facts = [
                'Long, muscular hind legs enable snow leopards to leap seven times their own body length in a single bound.',
                'A steady diet of dog food may cause blindness in your cat - it lacks taurine.',
                'The first cat show was in 1871 at the Crystal Palace in London.',
                'Cats walk on their toes.',
                'In 1987 cats overtook dogs as the number one pet in America.',
                'In an average year, cat owners in the United States spend over $2 billion on cat food.',
                'A cat\'s tongue has tiny barbs on it.',
                'Phoenician cargo ships are thought to have brought the first domesticated cats to Europe in about 900 BC.',
                'Cat bites are more likely to become infected than dog bites.',
                'The cat has 500 skeletal muscles (humans have 650).'
            ],
            images = [
                [
                    'https://24.media.tumblr.com/tumblr_m1ifukM2Ia1qilf9fo1_500.jpg',
                    'Cat'
                ],
                [
                    'https://24.media.tumblr.com/tumblr_lwb4l8u72Q1qzv52ko1_1280.jpg',
                    'Cat'
                ],
                [
                    'https://25.media.tumblr.com/tumblr_lnjg87BMly1qdmjgoo1_1280.jpg',
                    'Cat'
                ],
                [
                    'https://25.media.tumblr.com/tumblr_lpuiteZmj31qdvbl3o1_1280.jpg',
                    'Cat'
                ],
                [
                    'https://24.media.tumblr.com/tumblr_m0spyz536J1r2imw6o1_1280.jpg',
                    'Cat'
                ],
                [
                    'https://24.media.tumblr.com/tumblr_m4jxrnTNXy1qjc1a7o1_1280.jpg',
                    'Cat'
                ],
                [
                    'https://25.media.tumblr.com/tumblr_mazeucFPi41qhwmnpo1_1280.jpg',
                    'Cat'
                ],
                [
                    'https://25.media.tumblr.com/tumblr_m27vjmHY8Y1qh66wqo1_1280.png',
                    'Cat'
                ],
                [
                    'https://25.media.tumblr.com/tumblr_lz9jheHdZk1qe6zw8o1_1280.jpg',
                    'Cat'
                ],
                [
                    'https://24.media.tumblr.com/tumblr_lqhu4ab1Uh1qbhms5o1_500.jpg',
                    'Cat'
                ]
            ],
            factIndex = getRandomNumbers(0, facts.length),
            imageIndex = getRandomNumbers(0, images.length)

        if (app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)) {
            app.ask(app.buildRichResponse()
                .addSimpleResponse(facts[factIndex])
                .addBasicCard(app.buildBasicCard(facts[factIndex])
                .setImage(images[imageIndex][0], images[imageIndex][1]))
                .addSuggestions(['more', 'bye']));
        } else {
            app.ask(facts[factIndex], NO_INPUTS);
        }
    }

    // Handles Help Intent
    function help (app) {
        let helpResponses = [
                'Sure, I\'d love to help!',
                'What do you need?',
                'My b. Did I confuse you?'
            ],
            index = getRandomNumbers(0, helpResponses.length);

        if (app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)) {
            app.ask(app.buildRichResponse()
                .addSimpleResponse(helpResponses[index])
                .addSuggestions(['cat facts', 'bye']));
        } else {
            app.ask(helpResponses[index], NO_INPUTS);
        }
    }

    function start (app) {
        let helloResponses = [
                'Hey, let\'s get you a cat fact asap.',
                'Are you ready?',
                'Hmmm...where should we begin?'
            ],
            index = getRandomNumbers(0, helloResponses.length);

        if (app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)) {
            app.ask(app.buildRichResponse()
                .addSimpleResponse(helloResponses[index])
                .addSuggestions(['cat facts', 'help me']));
        } else {
            // This sample uses a sound clip from the Actions on Google Sound Library
            // https://developers.google.com/actions/tools/sound-library
            let purr = 'https://actions.google.com/sounds/v1/animals/cat_purr_close.ogg',
                speech = `<speak><audio src='${purr}'/> ${helloResponses[index]}</speak>`

            app.ask(speech);
        }
    }

  let actionMap = new Map();

  actionMap.set(BYE, bye);
  actionMap.set(FACTS, facts);
  actionMap.set(HELP, help);
  actionMap.set(START, start);

  app.handleRequest(actionMap);
});
