const request = require('request-promise');

module.exports = async (urlList, token) => {
  try {
    const data = urlList.join('\n');
    const res = await request({
      url: `http://data.zz.baidu.com/urls?site=https://www.alanwang.site&token=${token}`,
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: data
    });

    console.log(`baidu response : ${res}`);
  } catch (error) {
    console.log(`baidu error : ${error}`);
  }
};
