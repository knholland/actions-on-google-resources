'use strict';

const data = require('./data-helper');

function getRandomNumbers(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = (req) => {
    // TODO: Add sentiment analysis
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
                    index = getRandomNumbers(0, helloResponses.length),
                    surface = req.body.originalRequest.data.surface.capabilities,

                    // This sample uses a sound clip from the Actions on Google Sound Library
                    // https://developers.google.com/actions/tools/sound-library
                    purr = 'https://actions.google.com/sounds/v1/animals/cat_purr_close.ogg',
                    speech = `<speak><audio src='${purr}'/> ${helloResponses[index]}</speak>`;

                    if (surface.length > 1) {
                        dataResponse = {
                            speech: speech,
                            displayText: helloResponses[index],
                            data: {
                                google: {
                                    is_ssml: true,
                                    no_input_prompts: [
                                        {
                                            ssml: 'Give me another chance, pleeease!'
                                        }
                                    ],
                                    richResponse: {
                                        items: [
                                            {
                                                simpleResponse: {
                                                    textToSpeech: helloResponses[index]
                                                }
                                            }
                                        ],
                                        suggestions: [
                                            {
                                                title: 'cat facts'
                                            },
                                            {
                                                title: 'help me'
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    } else {
                        dataResponse.speech = helloResponses[index];
                        dataResponse.displayText = helloResponses[index];
                    }

                resolve(dataResponse);
            });
        },
        facts: (req) => {
            return new Promise ((resolve, reject) => {
                data.facts().then(
                    (fact) => {
                        let surface = req.body.originalRequest.data.surface.capabilities;

                        if (surface.length > 1) {
                            dataResponse = {
                                speech: fact,
                                displayText: fact,
                                data: {
                                    google: {
                                        is_ssml: true,
                                        no_input_prompts: [
                                            {
                                                ssml: 'Give me another chance, pleeease!'
                                            }
                                        ],
                                        richResponse: {
                                            items: [
                                                {
                                                    simpleResponse: {
                                                        textToSpeech: fact
                                                    }
                                                },
                                                {
                                                    basicCard: {
                                                        formattedText: fact,
                                                        image: {
                                                            url: 'http://thecatapi.com/api/images/get?size=full&format=src',
                                                            accessibilityText: 'Cat'
                                                        }
                                                    }
                                                }
                                            ],
                                            suggestions: [
                                                {
                                                    title: 'more'
                                                },
                                                {
                                                    title: 'bye'
                                                }
                                            ]
                                        }
                                    }
                                }
                            };
                        } else {
                            dataResponse.speech = fact;
                            dataResponse.displayText = fact;
                        }

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
                    index = getRandomNumbers(0, helpResponses.length),
                    surface = req.body.originalRequest.data.surface.capabilities;

                    if (surface.length > 1) {
                        dataResponse = {
                            speech: helpResponses[index],
                            displayText: helpResponses[index],
                            data: {
                                google: {
                                    is_ssml: true,
                                    no_input_prompts: [
                                        {
                                            ssml: 'Give me another chance, pleeease!'
                                        }
                                    ],
                                    richResponse: {
                                        items: [
                                            {
                                                simpleResponse: {
                                                    textToSpeech: helpResponses[index]
                                                }
                                            }
                                        ],
                                        suggestions: [
                                            {
                                                title: 'cat facts'
                                            },
                                            {
                                                title: 'bye'
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    } else {
                        dataResponse.speech = helpResponses[index];
                        dataResponse.displayText = helpResponses[index];
                    }

                resolve(dataResponse);
            });
        },
        bye: () => {
            return new Promise ((resolve) => {
                dataResponse.speech = 'ok, bye!';
                dataResponse.displayText = 'ok, bye!';

                resolve(dataResponse);
            });
        }
    };

    return intent[userIntent](req);
};
