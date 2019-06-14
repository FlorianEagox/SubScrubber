import { google } from 'googleapis';
import CONFIG from '../config';
import { OAuth2Client } from 'googleapis-common';

class YouTube {
  static async getSubscriptions(oauth2client) {
    return new Promise(async (resolve, reject) => {
      const oa = oauth2client;
      const service = google.youtube('v3');
      let subscriptions = [];
      let nextPage = null;
      do {
        const thisPage = await service.subscriptions.list({
          auth: oa,
          mine: true,
          part: 'snippet,contentDetails',
          maxResults: 50,
          pageToken: nextPage
        });
        subscriptions.push(...thisPage.data.items);
        nextPage = thisPage.data.nextPageToken;
      } while(nextPage != null);
      
  
      resolve(subscriptions.sort((a, b) => {
        const ta = a.snippet.title.toLowerCase();
        const tb = b.snippet.title.toLowerCase();
        return (ta < tb) ? -1 : (ta > tb) ? 1 : 0;;
      }));
    });
  }

  static async deleteSubscription(oauth2client, id) {
    const oa = oauth2client;
    const service = google.youtube('v3');
    return service.subscriptions.delete({
      auth: oa,
      id: id
    });
  }
}

class Auth {
  static getAuthURL(oauth2Client, scopes) {
    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  static async getTokenFromCode(oauth2Client, query) {
    return new Promise(async (resolve, reject) => {
      if (query.error) {
        return reject(query.error)
      }
      oauth2Client.getToken(query.code, function(err, token) {
        if (err)
          return reject(err);
        return resolve(token)
      });
    });
  }
}





export default {
  YouTube: YouTube,
  Auth: Auth
};