
class PlayerEventRepository {

	constructor({
		logger
	}) {
		this._logger = logger;
	}

	/**
	 * inserts the player event.
	 * @param {*} playerEvent instance of PlayerEventVO
	 */
	async insertPlayerEvent(playerEvent) {
		// TODO: do something
	}

	/**
	 * queries the events of the players
	 * @param {*} uuid (Optional) player uuid
	 * @Param {*} type (Optional) 'DEATH' | 'CHAT' | 'LOGIN' | 'LOGOUT'
	 * @returns Array of PlayerEventVO instances
	 */
	async findPlayerEvents({
		uuid,
		type
	} = {}) {
		// TODO: do something
		return [];
	}
}

module.exports = {
	PlayerEventRepository
};
