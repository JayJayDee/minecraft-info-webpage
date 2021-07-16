
// {"player":{"uuid":"d8da487c-f51d-36d3-8f08-893175b8d8d5","displayName":"jaydee","address":"183.109.193.172","port":56731,"exhaustion":1.6915033,"exp":0.76923084,"whitelisted":false,"banned":false,"op":false},"joinMessage":"§ejaydee joined the game","eventType":"PlayerJoin"}

class JoinEventVO {

	constructor({
		uuid,
		nickname,
		message,
		createdAt
	}) {
		this._uuid = uuid;
		this._nickname = nickname;
		this._message = message;
		this._createdAt = createdAt;

		if (createdAt && createdAt instanceof Date === false) {
			throw new Error('createdAt must be instance of Date');
		}
	}

	static fromEventAPIResponse(response) {
		return new JoinEventVO({
			uuid: response.uuid,
			nickname: response.displayName,
			message: response.joinMessage,
			createdAt: new Date()
		});
	}

	get uuid() {
		return this._uuid;
	}

	get nickname() {
		return this._nickname;
	}

	get message() {
		return this._message;
	}

	get createdAt() {
		return this._createdAt;
	}
}

module.exports = {
	JoinEventVO
};
