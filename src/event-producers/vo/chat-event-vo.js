
// {"playerName":"Gllory","message":"밑에 한칸 나두고 캐는거","eventType":"PlayerChat"}

const { PlayerEventVO } = require('../../repositories/vo/player-event-vo');

class ChatEventVO {

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
		return new ChatEventVO({
			nickname: response.playerName,
			message: response.message,
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

	toPlayerEventVO() {
		return new PlayerEventVO({
			uuid: this._uuid,
			nickname: this._nickname,
			type: PlayerEventVO.PlayerChat(),
			message: this._message,
			createdAt: this._createdAt
		});
	}
}

module.exports = {
	ChatEventVO
};
