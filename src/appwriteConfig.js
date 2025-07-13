// // src/appwriteConfig.js

// import { Client, Account, ID } from 'appwrite';

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('66cae4db000a272452f1');                 // Your project ID

// export const account = new Account(client);



import { Client, Account } from 'appwrite'; // Removed ID import

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('66cae4db000a272452f1'); // Your project ID

export const account = new Account(client);


