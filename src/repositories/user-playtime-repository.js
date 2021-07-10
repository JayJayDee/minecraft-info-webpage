
class UserPlaytimeRepository {

	constructor({
		userPlaytimeModel,
		sequelizeInstance
	}) {
		this._userPlaytimeModel = userPlaytimeModel;
		this._sequelizeInstance = sequelizeInstance
	}

	async recordPlaytime(uuids) {
		if (Array.isArray(uuids) === false) {
			throw new Error('parameter uuids must be array');
		}

		const transaction = await this._sequelizeInstance.transaction();

		try {
			await transaction.commit();

		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	}
}

module.exports = {
	UserPlaytimeRepository
};
