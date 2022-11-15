// DEPENDENCIES - these are series of npm packages that we will use to give our server useful functionality

const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

// EXPRESS CONFIGURATION - This will set up the basic properties for our express server

// this tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 6001;

//this will set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// this will set up the Express app to serve static assets directly
app.use(express.static('public'));


// ROUTER - The below points our server to a series of "route" files.

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


// LISTENER= The below code "starts" our server

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });
