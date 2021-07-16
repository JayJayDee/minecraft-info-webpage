
const { ChatEventVO } = require('./chat-event-vo');
const { DeathEventVO } = require('./death-event-vo');
const { JoinEventVO } = require('./join-event-vo');
const { QuitEventVO } = require('./quit-event-vo');
const { HourlyEventVO } = require('./hourly-event-vo');
const { MinutelyEventVO } = require('./minutely-event-vo');

module.exports = {
	ChatEventVO,
	DeathEventVO,
	JoinEventVO,
	QuitEventVO,
	HourlyEventVO,
	MinutelyEventVO
};
