import jwt from 'jsonwebtoken';
import { google } from 'googleapis';
import CONFIG from '../../config';
const OAuth2 = google.auth.OAuth2;

export default (req, res, next) => {
  const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);
  req.oauth2Client = oauth2Client;

  next();
};