
class WellKnownTopics {
	static CHAT() {
		return 'player:chat';
	}

	static DEATH() {
		return 'player:death';
	}

	static JOIN() {
		return 'player:join';
	}

	static TIME_HOURLY() {
		return 'time:hourly';
	}

	static TIME_HOURLY_AFTER_5MIN() {
		return 'time:hourly-after-5min';
	}

	static TIME_EVERY_MINUTE() {
		return 'time:every-minute';
	}
}

module.exports = {
	WellKnownTopics
};
