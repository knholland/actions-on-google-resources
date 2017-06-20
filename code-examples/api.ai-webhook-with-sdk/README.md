# API.AI Webhook - No SDK
The purpose of this example is to show you how to do advanced webhook/business logic using Firebase + SDK.



## To run this project:
1. `npm install -g firebase-tools`
2. `cd api-webhook-with-sdk`
3. `firebase login`
4. `firebase init`
5. `firebase use <projectId>`
6. `cd functions/`
7. `npm i`
8. `firebase deploy --only functions`
9. copy Function URL provided
10. paste this URL into the api.ai fulfillment webhook
11. save changes in api.ai
12. On integrations -> Actions on Google -> click test
13. Click "view", this should take you to the web simulator


_Note: This project is for demonstration purposes and is not intended for production use._



## APIs used:
- http://thecatapi.com/docs.html
- https://catfacts-api.appspot.com/
