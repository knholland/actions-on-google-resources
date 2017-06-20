'use strict';

const data = require('./data-helper');

function getRandomNumbers(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = (req) => {
    // TODO: Add sentiment analysis
    // TODO: Add cat noises?
    let dataResponse,
        intent,
        userIntent;

    userIntent = req.body.result.metadata.intentName;
    console.log(`User Intent: ${userIntent}`);

    // default response if a user's intent can't be matched
    dataResponse = {
        speech: '<speak>I\'m so sorry. I didn\'t understand.</speak>',
        displayText: 'I\'m so sorry. I didn\'t understand.',
        data: {
            google: {
                is_ssml: true,
                no_input_prompts: [
                    {
                        ssml: 'Give me another change, pleeease!'
                    }
                ]
            }
        }
    };

    intent = {
        start: () => {
            return new Promise ((resolve) => {
                // randomizers
                let helloResponses = [
                        'Hey, let\'s get you a cat fact asap.',
                        'Are you ready?',
                        'Hmmm...where should we begin?'
                    ],
                    index = getRandomNumbers(0, helloResponses.length);

                dataResponse.speech = helloResponses[index];
                dataResponse.displayText = helloResponses[index];

                resolve(dataResponse);
            });
        },
        facts: () => {
            return new Promise ((resolve, reject) => {
                Promise.all([data.facts(), data.photos()]).then(
                    (assets) => {
                        // TODO: update to actually pull surface from req
                        let surface = 'nah';

                        // if (surface === 'text') {
                            // TODO: Add a card here for image + fact
                            dataResponse = {
                            speech: JSON.parse(assets[0]).facts[0],
                            displayText: JSON.parse(assets[0]).facts[0],
                                data: {
                                    google: {
                                        is_ssml: true,
                                        no_input_prompts: [
                                            {
                                                ssml: 'Give me another chance, pleeease!'
                                            }
                                        ],
                                        expectedInputs: [
                                            {
                                                inputPrompt: {
                                                    items: [
                                                        {
                                                            simpleResponse: {
                                                                textToSpeech: 'Simple Response'
                                                            }
                                                        },
                                                        {
                                                            basicCard: {
                                                                image: {
                                                                    url: "https://24.media.tumblr.com/tumblr_l8cdenrcQp1qbth9mo1_500.jpg",
                                                                    text: 'This is our image.'
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    suggestions: [
                                                        {
                                                            title: 'give me another'
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            };
                        // } else {
                        //     dataResponse.speech = JSON.parse(assets[0]).facts[0];
                        //     dataResponse.displayText = JSON.parse(assets[0]).facts[0];
                        //
                        //
                        // }

                        resolve(dataResponse);
                    }
                ).catch((error) => {
                    console.error(`🚒 Error intent.facts: ${error}`);
                    reject(error);
                });
            });
        },
        help: () => {
            return new Promise ((resolve) => {
                // randomizers
                let helpResponses = [
                        'Sure, I\'d love to help!',
                        'What do you need?',
                        'My b. Did I confuse you?'
                    ],
                    index = getRandomNumbers(0, helpResponses.length);

                dataResponse.speech = helpResponses[index];
                dataResponse.displayText = helpResponses[index];

                resolve(dataResponse);
            });
        }
    };

    return intent[userIntent]();
};
