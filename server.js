const express = require('express'); // import express module

const app = express(); // it is common to name the express application object 'app' 
const port = process.env.PORT || 5000; // if port in environment variables, then use that, otherwise use port 5000

app.use(express.json()); // register module with express