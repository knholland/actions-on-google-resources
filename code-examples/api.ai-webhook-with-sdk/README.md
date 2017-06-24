# API.AI Webhook - Using Actions on Google SDK
The purpose of this example is to show you how to do advanced webhook/business logic using Firebase + Api.ai with the Actions on Google SDK.

# Run this Action:
1. Download Firebase CLI `npm install -g firebase-tools`
2. `firebase login`
3. `cd actions-on-google-resources/code-examples/api.ai-webhook-with-sdk`
4. `firebase init functions`
6. `cd actions-on-google-resources/code-examples/api.ai-webhook-with-sdk/functions`
7. `firebase deploy --only functions --project <projectId>`
8. copy URL provided for webhook endpoint - Use this as fulfillment webhook for api.ai project.

_Note: This project is for demonstration purposes and is not intended for production use._



## APIs used:
- https://market.mashape.com/nijikokun/kitten-placeholder#kitten
- https://catfacts-api.appspot.com/
