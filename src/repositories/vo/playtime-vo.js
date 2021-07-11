
class PlaytimeVO {

	constructor({
		uuid,
		nickname,
		minPlayed,
		lastPlayedTime,
	}) {
		this._uuid = uuid;
		this._nickname = nickname;
		this._minPlayed = minPlayed;
		this._lastPlayedTime = lastPlayedTime;

		if (lastPlayedTime && lastPlayedTime instanceof Date === false) {
			throw new Error('lastPlayedTime must be instanceof Date');
		}
	}

	get uuid() {
		return this._uuid;
	}

	get nickname() {
		return this._nickname;
	}

	get minPlayed() {
		if (this._minPlayed === undefined) {
			return 0;
		}
		return this._minPlayed;
	}

	get lastPlayedTime() {
		return this._lastPlayedTime;
	}

	static fromDBResponseElement(element) {
		const resp = new PlaytimeVO({
			uuid: element.uuid,
			nickname: element.nickname,
			minPlayed: element.minPlayed,
			lastPlayedTime: element.updatedAt
		});
		return resp;
	}

	getHourMin() {
		return {
			hour: Math.floor(this.minPlayed / 60),
			minute: this.minPlayed % 60
		};
	}

	lastPlayedExpressionFromNow() {
		if (!this._lastPlayedTime) {
			return '알수없음';
		}
		const tickDiff = Math.floor((Date.now() - this._lastPlayedTime.getTime()) / 1000);

		if (Math.floor(tickDiff / 60) === 0) {
			return '현재 접속 중';
		}

		if (tickDiff < 3600) {
			return `${Math.floor(tickDiff / 60)}분 전`;
		} else if (tickDiff < 86400) {
			return `${Math.floor(tickDiff / 3600)}시간 전`;
		}
		return `${Math.floor(tickDiff / 86400)}일 전`;
	}
}

module.exports = {
	PlaytimeVO
};
