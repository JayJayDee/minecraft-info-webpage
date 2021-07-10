const axios = require('axios');
const { DateTime } = require('luxon');

const { BaseJob } = require('./base-job');

class NotifyEveryHourJob extends BaseJob {

	constructor({
		minecraftRestHost
	}) {
		super();
		this._minecraftRestHost = minecraftRestHost;
	}

	_buildNotifyMessage() {
		const kstHour = DateTime.now().setZone('Asia/Seoul').hour;

		if (kstHour === 12) {
			return '12시. 현실 세계에서는 점심시간이예요. 다들 적당히 하고 밥좀 먹어요';
		} else if (kstHour === 18) {
			return '저녁 6시. 저녁시간입니다. 저녁 먹고 하세요 좀';
		} else if (kstHour === 1) {
			return '새벽 1시인데 적당히 하고 잠좀 자세여 좀';
		} else if (kstHour === 0) {
			return '자정입니다. 오늘도 마크하다가 하루 끝났쥬?'
		} else if (kstHour === 2) {
			return '새벽 2시인데 아직까지도 안자고 마크하는 분 있나여?';
		} else if (kstHour === 3) {
			return '설마 새벽 3시인데 아직까지 안자고 마크하는 흑우 없제?';
		} else if (kstHour === 23) {
			return '밤 11시입니다. 슬슬 마크 끄고 이닦고 잘준비좀 하시죠';
		}
		return `현실세계는 지금 ${kstHour}시 입니다.`;
	}

	async execute() {
		const message = `[SYSTEM] ${this._buildNotifyMessage()}`;
		const url = `${this._minecraftRestHost}/v1/chat/broadcast`;
		const params = new URLSearchParams();
		params.append('message', message);

		await axios.post(url, params, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});
	}
}

module.exports = {
	NotifyEveryHourJob
};
