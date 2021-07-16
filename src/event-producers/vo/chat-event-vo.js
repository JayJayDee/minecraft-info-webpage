
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

	static fromPlayerEventVO(playerEventVO) {
		if (playerEventVO.type === PlayerEventVO.PlayerChat()) {
			return new ChatEventVO({
				uuid: playerEventVO.uuid,
				nickname: playerEventVO.nickname,
				message: playerEventVO.message,
				createdAt: playerEventVO.createdAt
			});

		} else if (playerEventVO.type === PlayerEventVO.PlayerJoin()) {
			return new ChatEventVO({
				nickname: 'SYSTEM',
				message: `${playerEventVO.nickname}님이 들어오셨습니다.`,
				createdAt: playerEventVO.createdAt
			});

		} else if (playerEventVO.type === PlayerEventVO.PlayerQuit()) {
			return new ChatEventVO({
				nickname: 'SYSTEM',
				message: `${playerEventVO.nickname}님이 나가셨습니다.`,
				createdAt: playerEventVO.createdAt
			});

		} else {
			throw new Error(`the type: ${this._type} cannot be converted to ChatEventVO`);
		}
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

	lastEventExpressionFromNow() {
		const tickDiff = Math.floor((Date.now() - this._createdAt.getTime()) / 1000);
		if (tickDiff < 10) {
			return '방금 전';
		} else if (tickDiff < 60) {
			return `${tickDiff}초 전`;
		} else if (tickDiff < 3600) {
			return `${Math.floor(tickDiff / 60)}분 전`;
		} else if (tickDiff < 86400) {
			return `${Math.floor(tickDiff / 3600)}시간 전`;
		}
		return `${Math.floor(tickDiff / 86400)}일 전`;
	}
}

module.exports = {
	ChatEventVO
};
