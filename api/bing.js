const request = require('request-promise');

module.exports = async (site, urlList, token) => {
  const data = {
    siteUrl: site,
    urlList: urlList
  };

  try {
    const res = await request({
      url: `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${token}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      json: data
    });

    console.log(`bing response : ${res}`);
  } catch (error) {
    console.log(`bing error : ${error}`);
  }
};
