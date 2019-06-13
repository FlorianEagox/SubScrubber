import express from 'express';
import { google } from 'googleapis';
import AuthController from './auth_controller';
import AuthMiddleware from '../middleware/auth_middleware';
const router = express.Router();

router.use('/auth', AuthController);

router.get('/subscriptions', AuthMiddleware, (req, res) => {
  const oauth2Client = req.oauth2Client;

  let service = google.youtube('v3');
  
  const subscriptions = [];
  function getPage(pageToken) {
    service.subscriptions.list({
      auth: oauth2Client,
      mine: true,
      part: 'snippet,contentDetails',
      maxResults: 50,
      pageToken: pageToken
    }, function(err, response) {
      if (err) {
        res.send('The API returned an error: ' + err);
        return;
      }
      const data = response.data;
      subscriptions.push(...data.items);
      if (!data.nextPageToken) {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(subscriptions, null, 4));
      } else {
        getPage(data.nextPageToken);
      }
    });
  }

  getPage(null);
});

export default router;