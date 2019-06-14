import jwt from 'jsonwebtoken';
import { google } from 'googleapis';
import CONFIG from '../../config';
const OAuth2 = google.auth.OAuth2;

export default (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.status(401).send({
      error: 'Not Authorized.'
    });
  }
  let credentials = null;
  try {
    credentials = jwt.verify(req.cookies.jwt, CONFIG.JWTsecret);
  } catch(err) {
    return res.status(401).send({
      error: 'Not Authorized.'
    });
  }

  req.oauth2Client.credentials = credentials;

  next();
};