import express from 'express';
import { google } from 'googleapis';
import CONFIG from '../../config';
import jwt from 'jsonwebtoken';
const router = express.Router();
const OAuth2 = google.auth.OAuth2;

const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];

router.get('/login', async (req, res) => {
  const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);
  return res.status(302).send({
    googleLoginURL: oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    })
  });
});

router.get('/receive_token', (req, res) => {
  const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);
  if (req.query.error) {
    return res.status(401).send({
      error: req.query.error
    });
  }
  oauth2Client.getToken(req.query.code, function(err, token) {
    if (err)
      return res.status(400).send({
        error: err
      });
    res.cookie('jwt', jwt.sign(token, CONFIG.JWTsecret));
    return res.status(200).send({
      success: true
    });
  });
});

export default router;