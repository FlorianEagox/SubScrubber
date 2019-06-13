import jwt from 'jsonwebtoken';
import { google } from 'googleapis';
import CONFIG from '../../config';
const OAuth2 = google.auth.OAuth2;

export default (req, res, next) => {
  if (!req.cookies.jwt) {
    res.redirect('login');
    next();
    return;
  }
  
  let credentials = jwt.verify(req.cookies.jwt, CONFIG.JWTsecret);
  if (credentials == null) {
    res.redirect('login');
    next();
    return;
  }

  const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);
  oauth2Client.credentials = credentials;

  req.oauth2Client = oauth2Client;

  next();
};