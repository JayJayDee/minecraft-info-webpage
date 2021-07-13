const nodeTelegramBotApi = require('node-telegram-bot-api');
const axios = require('axios');

const initTelegramBot = (token, mcHost) => {
    if(token === null) return null;

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
                const url = `${mcHost}/v1/chat/broadcast`;
                const params = new URLSearchParams();
                params.append('message', tgMsg);
                axios.post(url,params,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'accept': 'application/json'
                        }
                    }
                );
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
