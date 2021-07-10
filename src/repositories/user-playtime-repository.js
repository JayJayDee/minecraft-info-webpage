const { PlaytimeVO } = require("./vo/playtime-vo");

class UserPlaytimeRepository {

	constructor({
		userPlaytimeModel,
		sequelizeInstance,
		logger
	}) {
		this._userPlaytimeModel = userPlaytimeModel;
		this._sequelizeInstance = sequelizeInstance;
		this._logger = logger;
	}

	/**
	 * 플레이 시간 증가
	 * @param {*} players array of ServerPlayerVO
	 */
	async recordPlaytime(players) {
		if (Array.isArray(players) === false) {
			throw new Error('parameter uuids must be array');
		}

		if (players.length === 0) {
			return;
		}

		const transaction = await this._sequelizeInstance.transaction();

		try {
			for (const player of players) {
				const rawPlayTime = await this._userPlaytimeModel.findOne({
					where: {
						uuid: player.uuid
					}
				}, { transaction });

				if (!rawPlayTime) {
					const created = this._userPlaytimeModel.build({
						uuid: player.uuid,
						nickname: player.nickname,
						minPlayed: 1
					});
					await created.save({ transaction });

				} else {
					rawPlayTime.minPlayed = rawPlayTime.minPlayed + 1;
					await rawPlayTime.save({ transaction });
				}
			}
			await transaction.commit();
			return players.map(PlaytimeVO.fromDBResponseElement);

		} catch (err) {
			await transaction.rollback();
			this._logger.error(err);
			throw err;
		}
	}

	async findPlaytimesOrdered(limit) {
		const allPlaytimeRecords = await this._userPlaytimeModel.find();
		const allPlaytimes = allPlaytimeRecords.map(PlaytimeVO.fromDBResponseElement);

		const sorted = allPlaytimes.sort((a, b) => a.minPlayed > b.minPlayed ? 1 : -1);

		if (limit === undefined) {
			return sorted;
		}
		return sorted.slice(0, limit);
	}
}

module.exports = {
	UserPlaytimeRepository
};
