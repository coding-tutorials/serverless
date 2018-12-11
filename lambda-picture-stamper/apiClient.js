const https = require('https')

const post_req = http.request({

},(res) => {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

module.exports = { download, deleteLocalFiles }
