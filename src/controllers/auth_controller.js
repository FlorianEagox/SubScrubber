import express from 'express';
import { google } from 'googleapis';
import CONFIG from '../../config';
import jwt from 'jsonwebtoken';
const router = express.Router();
const OAuth2 = google.auth.OAuth2;

const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];

router.get('/login', async (req, res) => {
  const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);
  res.redirect(oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  }));
});

router.get('/receive_token', (req, res) => {
  const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);
  if (req.query.error) {
    res.redirect('/');
    return;
  }
  oauth2Client.getToken(req.query.code, function(err, token) {
    if (err)
      res.redirect('login');
    res.cookie('jwt', jwt.sign(token, CONFIG.JWTsecret));
    res.redirect('/api/v1/subscriptions');
  });
});

export default router;