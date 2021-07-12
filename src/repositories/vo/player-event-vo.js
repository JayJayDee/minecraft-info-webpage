
class PlayerEventVO {

	constructor({
		uuid,
		nickname,
		type,
		message,
		createdAt
	}) {
		this._uuid = uuid;
		this._nickname = nickname;
		this._type = type;
		this._message = message;
		this._createdAt = createdAt;

		if (createdAt && createdAt instanceof Date === false) {
			throw new Error('the createdAt must be instance of Date');
		}
	}

	get uuid() {
		return this._uuid;
	}

	get nickname() {
		return this._nickname;
	}

	get type() {
		return this._type;
	}

	get createdAt() {
		return this._createdAt;
	}
}

module.exports = {
	PlayerEventVO
};
