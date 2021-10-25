// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const uaparser = require('ua-parser-js');
const marked = require('marked');
const fs = require('fs');
const path = require('path');

// Import config
const config = require('./config.json');
const directory = require('./directory.json');
const articleCacheTime = 100000;
const articleCache = {
  metadata: [],
  timestamp: 0
};

function updateMetadata() {
  const fresh = Date.now() - articleCache.timestamp <= articleCacheTime;
  if (!fresh) {
    articleCache.metadata = fs.readdirSync('./assets/news/')
      .filter(a => path.parse(a).ext === '.md')
      .map(
        a => fs.readFileSync(`./assets/news/${a}`)
          .toString()
          .split('---')[0]
      )
      .map(JSON.parse);

    articleCache.timestamp = Date.now();
  }
}

const supportedDistros = [
  'Windows',
  'Mac OS',
  'Ubuntu',
  'Debian',
  'Fedora',
  //'Raspbian'
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
    selectDistro: true,
    supportedDistros
  });
});

app.get('/install/:distro/', async (request, response) => {
  if (supportedDistros.indexOf(request.params.distro.replace('-', ' ')) === -1)
    return response.redirect(302, '/install/select/');

  response.render('install', {
    config,
    distro: request.params.distro.replace('-', ' '),
    cookies: request.cookies
  });
});

app.get('/news/', async (request, response) => {
  updateMetadata();

  return response.render('news', {articles: articleCache.metadata, config, marked});
});

app.get('/news/article/:slug/', async (request, response, next) => {
  let content = '';
  try {
    content = fs.readFileSync(path.resolve(`./assets/news/${request.params.slug}.md`)).toString();
  } catch (err) {
    console.warn(err);
    return next();
  }

  const metadata = JSON.parse(content.split('---')[0].trim());

  content = marked(content.split('---').slice(1).join('---'));

  response.render('article', {content, metadata, config});
});

app.get('/feed/', async (request, response) => {
  updateMetadata();

  response.setHeader('Content-type', 'application/rss+xml');
  return response.send(`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Verbose Guacamole News</title>
    <description>News about the Git- and Markdown-powered FOSS novel editor, Verbose Guacamole.</description>
    <language>en-us</language>
    <copyright>© Benjamin Hollon and the Verbose Guacamole contributors ${(new Date()).getFullYear()}. Content licensed under CC BY-NC 4.0.</copyright>
    <link>https://${request.hostname}/</link>${
      articleCache.metadata.map(article => `
        <item>
          <title>${article.title}</title>
          <link>https://${request.hostname}/news/article/${article.slug}/</link>
          <guid ispermalink="false">${article.slug}</guid>
          <pubDate>${(new Date(article.date)).toUTCString()}</pubDate>
          <description>${article.summary.replace('&nbsp;', ' ').replace(/(<([^>]+)>)/ig, '')}</description>
        </item>
      `.trim())
    }
  </channel>
</rss>`).end();
});

// Listen on port in config.json
app.listen(config.port, async () => {
  console.info('Serving awesomeness on port ' + config.port);
});
