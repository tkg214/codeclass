# CodeClass
## A Lighthouse Labs Final Project

CodeClass is a product that is aimed to help those who are eager to learn how to code. Classroom owners can share their link to other users, and can then use the the chat feature to communicate to those in the room. Authentication is done through Passport using GitHub credentials. Using the Ace Code Editor, any changes made by the owner are sent in real time to connected users. The changes, along with changes to the room state and messages, are then stored in the database for persistent room state. Room owners can also record audio, and playback is synced with the associated edits.

The client folder represents the build for the room. Please run npm install on both the server folder and client folder. Upon installing dependencies, please run npm start to start both servers. You will also need to modify .env.example to .env with the appropriate configurations.

## The Stack

- Backend: Node.js and Express
- Database: PostgresQL and Knex
- WebSockets: Socket.io
- Frontend: React, Redux, EJS, and Scss
- Development: Webpack
