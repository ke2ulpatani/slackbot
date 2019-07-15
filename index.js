const Slackbot = require('slackbots');
const axios = require('axios');
const cfg = require('./config.json');

const bot = new Slackbot({
    token: cfg.BOT_TOKEN,
    name: 'jokebot'
});


//Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji:':cow:'
    };

    bot.postMessageToChannel('general',"Get ready to laugh with @jokebot", params); 
}); 

//Error Handler
bot.on('error', err => console.log(err));

//Message Handler
bot.on('message', data => {
    if(data.type !== 'message') {
        return;
    }

    handleMessage(data.text);
});

//Response to data texts
function handleMessage(message) {
    if (message.includes(' chucknorris')) {
        chuckJoke();
    } else if (message.includes(' yomama')) {
        yomamaJoke();
    }
}

//Tells a yo mama joke
function yomamaJoke() {
    axios.get('http://api.yomomma.info')
        .then(res => {
            const joke = res.data.joke;

            const params = {
                icon_emoji:':laughing:'
            };

            bot.postMessageToChannel('general',`Yo mama: ${joke}`, params); 

        })
}

//Tells a chucknorris joke
function chuckJoke() {
    axios.get('http://api.icndb.com/jokes/random')
        .then(res => {
            const joke = res.data.value.joke;

            const params = {
                icon_emoji:':laughing:'
            };

            bot.postMessageToChannel('general',`Chuck Norris: ${joke}`, params); 

        })
}
