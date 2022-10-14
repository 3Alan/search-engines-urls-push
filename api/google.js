const request = require('request-promise');
const { google } = require('googleapis');

module.exports = async (urlList, clientEmail, key) => {
  try {
    const jwtClient = new google.auth.JWT(
      clientEmail,
      null,
      // 巨坑 https://stackoverflow.com/questions/51020113/nodejs-google-pem-routinespem-read-biono-start-line
      key.replace(new RegExp('\\\\n', 'g'), '\n'),
      ['https://www.googleapis.com/auth/indexing'],
      null
    );

    jwtClient.authorize((err, tokens) => {
      if (err) {
        console.log(`google authorize error: ${err}`);
        return;
      }

      urlList.map(async url => {
        let options = {
          url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          auth: { bearer: tokens.access_token },
          json: {
            url: url,
            type: 'URL_UPDATED'
          }
        };

        const res = await request(options);
        console.log(`google response : ${JSON.stringify(res)}`);
      });
    });
  } catch (error) {
    console.log(`google error : ${error}`);
  }
};
