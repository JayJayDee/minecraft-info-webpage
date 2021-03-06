const nodeTelegramBotApi = require('node-telegram-bot-api');
const { getLogger } = require('../logger');
const { getMcApiRequester } = require('../mc-api-requester');
const { getEventBroker } = require('../event-broker');
const { WellKnownTopics } = require('../well-known-topics');
const { getRepository } = require('../repositories');
const { PlayerEventVO } = require('../repositories/vo/player-event-vo');

const initTelegramBot = (token) => {
    const logger = getLogger('telegram');
    let bot = null;

    if(token === null) {
        logger.info('Not found tg_token');
        return null;
    }

    try {
        bot = new nodeTelegramBotApi(token, {polling: true});
    } catch(err) {
        logger.error(err);
        bot = null;
    }

    if(bot === null) return null;
    logger.info('tgbot ready');

    const mcApiRequester = getMcApiRequester();
    const userEventRepository = getRepository('PlayerEventRepository');
    const roomIds = [];

    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        if(roomIds.indexOf(chatId) < 0) {
            roomIds.push(chatId);
        }
    });

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
            let name = msg.from.last_name ? msg.from.last_name + ' ' : '';
            name += msg.from.first_name ? msg.from.first_name: '';
            const arr = msg.text.split(' ');
            if(arr.length > 1 && typeof (arr[1]) === 'string') {
                userEventRepository.insertPlayerEvent(
                    new PlayerEventVO({
                        nickname: `TG_${name}`,
                        type: PlayerEventVO.PlayerChat(),
                        message: msg.text.replace('/tell', '')
                    })
                );

                const tgMsg = msg.text.replace('/tell', `[${name}]`);
                mcApiRequester.requestBroadcast(tgMsg);
            }

        } catch(err) {
            bot.sendMessage(msg.chat.id, '메세지 전송 실패');
        }
    });

    const eventBroker = getEventBroker();
    const sendMessage = (id, msg) => {
        try{
            bot.sendMessage(id, msg);
        } catch(err) {
            console.log(err);
        }
    }

    eventBroker.subscribe(
        WellKnownTopics.CHAT(),
        (chatEventVO) => {
            const name = chatEventVO.nickname;
            const chat = chatEventVO.message;
            roomIds.forEach(id => sendMessage(id, `[${name}] ${chat}`));
        });

    eventBroker.subscribe(
        WellKnownTopics.JOIN(),
        (joinEventVO) => {
            const name = joinEventVO.nickname;
            roomIds.forEach(id => sendMessage(id,  `[입장][${name}] 어서오고!`));
        });

    eventBroker.subscribe(
        WellKnownTopics.DEATH(),
        (deathEventVO) => {
            const name = deathEventVO.nickname;
            const message = deathEventVO.deathMessage;
            roomIds.forEach(id => sendMessage(id,  `[사망][${name}]... ${message}`));
        });

    eventBroker.subscribe(
        WellKnownTopics.QUIT(),
        (quitEventVO) => {
            const name = quitEventVO.nickname;
            roomIds.forEach(id => sendMessage(id,  `[퇴장][${name}] 기억할게! `));
        });

    logger.info('telegram bot is ready');

    return bot;
}

module.exports = {
    initTelegramBot
};
