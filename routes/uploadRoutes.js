const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const { accessKeyId, secretAccessKey } = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
  region: 'eu-central-1',
});

module.exports = (app) => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;
    const params = {
      Bucket: 'varvar-blogster',
      ContentType: 'image/png',
      Key: key,
      Expires: 120,
    };
    s3.getSignedUrl('putObject', params, (err, url) => {
      res.send({ key, url });
    });
  });
};
