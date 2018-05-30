const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connector = require('./connector');
const config = require('../conf'); 

app.use(bodyParser.json());


var c =  new connector(config.db);

c.on('ready', () => {
   console.log('MongoDB plugged in at the wall');
}); 

// Where me routes!?

app.listen(3000, function () {
     console.log('Listening for magick on port 3000...')
})

