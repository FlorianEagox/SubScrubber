import express from 'express';
import cookieParser from 'cookie-parser';
import fetch from 'node-fetch';
import url from 'url';
import ApiController from './controllers/api_controller';
import AuthMiddleware from './middleware/auth_middleware';
import OAuthMiddleware from './middleware/oauth_middleware';
import Api from './api';
import CONFIG from '../config';

const PORT = 3002;

async function main() {
  const app = express();

  app.use(cookieParser());
  app.use(OAuthMiddleware);

  app.use('/static', express.static('./public'));

  app.set('view engine', 'pug');
  app.set('views', './views');

  app.get('/', (req, res) => {
    res.render('index', { siteConfig: CONFIG });
  });

  app.get('/auth_callback', async (req, res) => {
    const success = await fetch(url.format({
      pathname: req.protocol + '://' + req.get('host') + "/api/v1/auth/receive_token",
      query: req.query
    })).then(res => res.json());
    if (success.success) {
      res.cookie('jwt', success.jwt);
      res.redirect('/subscriptions');
    } else {
      res.redirect('/');
    }
  });

  app.get('/subscriptions', AuthMiddleware, async (req, res) => {
    res.render('subscriptions', {
      subscriptions: await Api.YouTube.getSubscriptions(req.oauth2Client),
      siteConfig: CONFIG
    });
  });

  app.use('/api/v1', ApiController);

  app.listen(CONFIG.port, () => {
    console.log(`Listening on port ${CONFIG.port}`);
  });
}

main();