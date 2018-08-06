// process.env.API_BASE_URL = "http://localhost:8080/bot";
const express = require('express');
const line = require('@line/bot-sdk');

const config = {
    channelAccessToken: process.env.YOUR_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.YOUR_CHANNEL_SECRET
};

const app = express();

app.set('port', (process.env.PORT || 3030));

app.post('/', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
    console.log('event ->', event);

    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    });
}

app.listen(app.get('port'), function() {
    console.log('Node app is running -> port:', app.get('port'));
});
