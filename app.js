// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const uaparser = require('ua-parser-js');

// Import config
const config = require('./config.json');
const directory = require('./directory.json');


const supportedDistros = [
  'Windows',
  'Mac OS',
  'Ubuntu',
  'Debian',
  'Fedora',
  'Raspbian'
];

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
app.get('/install/', async (request, response) => {
  const userAgent = request.get('User-Agent');
  const distro = uaparser(userAgent).os.name;
  if (supportedDistros.indexOf(distro) === -1)
    return response.redirect(302, '/install/select/');
  else
    return response.redirect(302, `/install/${distro.replace(' ', '-')}/`);
});

app.get('/install/select/', async (request, response) => {
  const userAgent = request.get('User-Agent');
  const distro = uaparser(userAgent).os.name;

  response.render('install', {
    config,
    distro: distro,
    cookies: request.cookies,
    selectDistro: true
  });
});

app.get('/install/:distro/', async (request, response) => {
  if (supportedDistros.indexOf(request.params.distro) === -1)
    return response.redirect(302, '/install/select/');

  response.render('install', {
    config,
    distro: request.params.distro.replace('-', ' '),
    cookies: request.cookies
  });
});

// Listen on port in config.json
app.listen(config.port, async () => {
  console.info('Serving awesomeness on port ' + config.port);
});
