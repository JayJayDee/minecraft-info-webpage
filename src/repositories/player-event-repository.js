const { PlayerEventVO } = require('./vo/player-event-vo');

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
	 * @Param {*} types (Optional) Array of 'PlayerChat' | 'PlayerJoin' | 'PlayerDeath' | 'PlayerQuit'
	 * @Param {*} take (Optional) number of element which you want
	 * @Param {*} offset (Optional) offset of element which you want to fetch
	 * @returns Array of PlayerEventVO instances
	 */
	async findPlayerEvents({
		uuid,
		types,
		take,
		offset
	} = {}) {
		if (types && Array.isArray(types) === false) {
			throw new Error('types must be Array of PlayerChat | PlayerJoin | PlayerDeath | PlayerQuit');
		}
		const rawRows = await this._userEventModel.findAll({
			where: {
				... uuid ? { uuid } : {},
				... types ? { type: types } : {},
			},
			... offset ? { offset } : {},
			... take ? { limit: take } : {},
			order: [
				['id', 'DESC']
			]
		});
		return rawRows.map(PlayerEventVO.fromDBResponseElement);
	}
}

module.exports = {
	PlayerEventRepository
};
