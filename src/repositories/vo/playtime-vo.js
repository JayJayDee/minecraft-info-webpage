
class PlaytimeVO {

	constructor({
		uuid,
		nickname,
		minPlayed
	}) {
		this._uuid = uuid;
		this._nickname = nickname;
		this._minPlayed = minPlayed;
	}

	get uuid() {
		return this._uuid;
	}

	get nickname() {
		return this._nickname;
	}

	get minPlayed() {
		return this._minPlayed;
	}

	static fromDBResponseElement(element) {
		return new ServerPlayerVO({
			uuid: element.uuid,
			nickname: element.displayName,
			minPlayed: element.minPlayed
		});
	}

	getHourMin() {
		return {
			hour: Math.floor(this._minPlayed / 60),
			minute: this._minPlayed % 60
		};
	}
}

module.exports = {
	PlaytimeVO
};
