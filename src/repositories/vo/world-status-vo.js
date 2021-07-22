
class WorldStatusVO {

	constructor({
		worldUuid,
		worldName,
		worldTime,
		worldType,
		storm,
		thundering
	}) {
		this._worldUuid = worldUuid;
		this._worldName = worldName;
		this._worldTime = worldTime; // 0 ~ 24000, 0 - 12000 -> day, 12000 - 24000 -> night
		this._worldType = worldType; // OVERWORLD | NETHER | THE_END
		this._storm = storm; // boolean
		this._thundering = thundering; // boolean
	}

	static Overworld() {
		return 'OVERWORLD';
	}
	
	static Nether() {
		return 'NETHER';
	}

	static TheEnd() {
		return 'THE_END';
	}

	static DAY() {
		return 'DAY';
	}

	static NIGHT() {
		return 'NIGHT';
	}

	static fromSeverResponseElement(element) {
		return new WorldStatusVO({
			worldUuid: element.uuid,
			worldName: element.name,
			worldTime: element.time,
			worldType:
				element.name === 'world_the_end' ? WorldStatusVO.TheEnd() :
				element.name === 'world_nether' ? WorldStatusVO.Nether() :
				WorldStatusVO.Overworld(),
			storm: element.storm,
			thundering: element.thundering
		});
	}

	get worldUuid() {
		return this._worldUuid;
	}
	
	get worldName() {
		return this._worldName;
	}

	get worldTime() {
		return this._worldTime;
	}

	get worldType() {
		return this._worldType;
	}

	hourMinExpression() {
		const hour = (Math.floor(this._worldTime / 1000) + 6) % 24;
		const minute = Math.floor((this._worldTime % 1000) * 60 / 1000);
		return { hour, minute };
	} 

	dayOrNight() {
		const { hour } = this.hourMinExpression();
		if (hour >= 6 && hour < 18) {
			return WorldStatusVO.DAY();
		}
		return WorldStatusVO.NIGHT();
	}
}

module.exports = {
	WorldStatusVO
};
