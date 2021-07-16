

class MinutelyEventVO {

	constructor({
		createdAt
	}) {
		this._createdAt = createdAt;
		if (createdAt instanceof Date === false) {
			throw new Error('instance of createdAt must be instance of Date');
		}
	}

	get createdAt() {
		return this._createdAt;
	}
}

module.exports = {
	MinutelyEventVO
};
