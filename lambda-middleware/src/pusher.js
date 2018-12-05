var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '656729',
  key: process.env.pusher_key,
  secret: process.env.pusher_secret,
  cluster: 'us2'
});

const sendMessage = () => {
  pusher.trigger('lambdaChannel-${}', 'photoStamperEvent', { "message": "hello world" });
}
