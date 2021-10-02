// Import modules
const express = require('express');
const bodyParser = require('body-parser');

// Import config
const config = require('./config.json');
const directory = require('./directory.json');

const app = express();

// Add middleware
app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use((request, response, next) => {
  if (directory[request.path] !== undefined) {
    return response.render(directory[request.path], {
      parameters: request.query,
      config,
      //md,
      cookies: request.cookies,
    });
  }

  if (next) return next();
  return response.status(404).end();
});
app.set('view engine', 'pug');
app.set('views', './templates/');

// Routes

// Listen on port in config.json
app.listen(config.port, async () => {
  console.info('Serving awesomeness on port ' + config.port);
});
