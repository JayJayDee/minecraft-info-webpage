const nodeTelegramBotApi = require('node-telegram-bot-api');

const { getMcApiRequester } = require('../mc-api-requester');

const initTelegramBot = (token, mcHost) => {
    if(token === null) return null;

    // dependencies in your app
    const mcApiRequester = getMcApiRequester();

    // app entry
    const bot = new nodeTelegramBotApi(token, { polling: true });

    bot.onText(/\/cmd (:?)/, (msg) => {
        const arr = msg.text.split(' ');
        if (arr.length > 1 && typeof (arr[1]) === 'string') {
            const cmd = arr[1];
            if (cmd === 'test') {
                bot.sendMessage(msg.chat.id, 'It\'s just test.');
            }
        }
    });

    bot.onText(/\/tell (:?)/, (msg) => {
        try{
            const name = `${msg.from.last_name} ${msg.from.first_name}`
            const arr = msg.text.split(' ');
            if(arr.length > 1 && typeof (arr[1]) === 'string') {
                const tgMsg = msg.text.replace('/tell', `[${name}]`);
                mcApiRequester.requestBroadcast(tgMsg);
            }
        } catch(err) {
            bot.sendMessage(msg.chat.id, '메세지 전송 실패');

        }
    });

    return bot;
}

module.exports = {
    initTelegramBot
};
