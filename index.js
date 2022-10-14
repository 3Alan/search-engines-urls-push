const core = require('@actions/core');
const xmlConvert = require('xml-js');
const request = require('request-promise');
const submitBaidu = require('./api/baidu.js');
const submitBing = require('./api/bing.js');
const submitGoogle = require('./api/google.js');

try {
  const site = core.getInput('site');
  const sitemap = core.getInput('sitemap');
  const count = core.getInput('count');
  const baiduToken = core.getInput('baidu-token');
  const bingToken = core.getInput('bing-token');
  const googleClientEmail = core.getInput('google-client-email');
  const googlePrivateKey = core.getInput('google-private-key');
  request(sitemap).then(xml => {
    const urlList = xmlConvert
      .xml2js(xml, { compact: true })
      .urlset.url.map(item => item.loc['_text']);
    const submitUrlList = count ? urlList.slice(0, count) : urlList;

    baiduToken && submitBaidu(submitUrlList, baiduToken);
    bingToken && submitBing(site, submitUrlList, bingToken);
    googleClientEmail &&
      googlePrivateKey &&
      submitGoogle(submitUrlList, googleClientEmail, googlePrivateKey);
  });
} catch (error) {
  core.setFailed(error.message);
}
