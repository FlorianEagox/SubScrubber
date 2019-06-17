import express from 'express';
import { google } from 'googleapis';
import CONFIG from '../../config';
import jwt from 'jsonwebtoken';
import Api from '../api';
const router = express.Router();
const OAuth2 = google.auth.OAuth2;


router.get('/login', async (req, res) => {
  return res.status(200).send({
    googleLoginURL: Api.Auth.getAuthURL(req.oauth2Client, CONFIG.oauth2Credentials.scopes)
  });
});

router.get('/receive_token', (req, res) => {
  Api.Auth.getTokenFromCode(req.oauth2Client, req.query).then(token => {
    console.log(token);
    
    res.cookie('jwt', jwt.sign(token, CONFIG.JWTsecret));
    return res.status(200).send({
      success: true,
      jwt: jwt.sign(token, CONFIG.JWTsecret)
    });
  }).catch(err => {
    return res.status(401).send({
      error: err
    });
  });
});

export default router;