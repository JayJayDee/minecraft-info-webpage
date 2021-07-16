
class PlayerEventRepository {

	constructor({
		logger,
		userEventModel
	}) {
		this._logger = logger;
		this._userEventModel = userEventModel;
	}

	/**
	 * inserts the player event.
	 * @param {*} playerEvent instance of PlayerEventVO
	 */
	async insertPlayerEvent(playerEvent) {
		const created = this._userEventModel.build({
			type: playerEvent.type,
			uuid: playerEvent.uuid,
			nickname: playerEvent.nickname,
			message: playerEvent.message
		});
		await created.save();
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
