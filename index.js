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
    // TODO: 或者直接从json文件中获取
    const urlList = xmlConvert
      .xml2js(xml, { compact: true })
      .urlset.url.map(item => item.loc['_text']);
    const submitUrlList = count ? urlList.slice(0, count) : urlList;

    if (submitUrlList.length > 0) {
      baiduToken && submitBaidu(site, submitUrlList, baiduToken);
      bingToken && submitBing(site, submitUrlList, bingToken);
      googleClientEmail &&
        googlePrivateKey &&
        submitGoogle(submitUrlList, googleClientEmail, googlePrivateKey);
    } else {
      console.log('❗ No url to submit!');
    }
  });
} catch (error) {
  core.setFailed(error.message);
}
