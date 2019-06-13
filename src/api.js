import { google } from 'googleapis';

async function getSubscriptions(oauth2client) {
  return new Promise(async (resolve, reject) => {
    const oa = oauth2client;
    const service = google.youtube('v3');
    const subscriptions = [];
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

    resolve(subscriptions);
  });
}



export default {
  getSubscriptions: getSubscriptions
};