import express from 'express';
import ApiController from './controllers/api_controller';
import AuthMiddleware from './middleware/auth_middleware';
import Api from './api';
import { google } from 'googleapis';
import cookieParser from 'cookie-parser';

const PORT = 3002;

async function main() {
  const app = express();

  app.use(cookieParser());

  app.use('static', express.static('public'));

  app.set('view engine', 'pug');
  app.set('views', './views');

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/subscriptions', AuthMiddleware, async (req, res) => {
    res.render('subcriptions', {
      subscriptions: await Api.getSubscriptions(req.oauth2Client)
    });
  });

  app.use('/api/v1', ApiController);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

main();