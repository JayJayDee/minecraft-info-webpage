// {
// 	"player": {
// 	  "uuid": "d8da487c-f51d-36d3-8f08-893175b8d8d5",
// 	  "displayName": "jaydee",
// 	  "address": "210.183.91.1",
// 	  "port": 55321,
// 	  "exhaustion": 0.25,
// 	  "exp": 0,
// 	  "whitelisted": false,
// 	  "banned": false,
// 	  "op": false
// 	},
// 	"quitMessage": "§ejaydee left the game",
// 	"eventType": "PlayerQuit"
//   }
  
const { PlayerEventVO } = require('../../repositories/vo/player-event-vo');

class QuitEventVO {

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
		return new QuitEventVO({
			uuid: response.player.uuid,
			nickname: response.player.displayName,
			message: response.quitMessage,
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
			type: PlayerEventVO.PlayerQuit(),
			message: this._message,
			createdAt: this._createdAt
		});
	}
}

module.exports = {
	QuitEventVO
};
