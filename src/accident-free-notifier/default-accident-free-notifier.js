const { shuffle } = require('lodash');

class DefaultAccidentFreeNotifier {
	
	constructor({
		mcApiRequester,
		userEventRepository,
		logger
	}) {
		this._mcApiRequester = mcApiRequester;
		this._userEventRepository = userEventRepository;
		this._logger = logger;
	}

	async triggerPlayerDeath(playerDeathVO) {
		const lastDeath = await this._getLastDeath();
		if (!lastDeath) {
			return;
		}

		const diff = this._getDiffInSec(lastDeath.createdAt);
		const recordExpr =
			diff < 60 ? `${diff}초` :
				diff < 3600 ? `${Math.floor(diff / 60)}분` :
					`${Math.floor(diff / 3600)}시간`;

		this._mcApiRequester.requestBroadcast(
			`[SYSTEM] ${playerDeathVO.nickname}님 사망으로 무사고 ${recordExpr} 기록이 파괴 완료`
		);
	}

	async notifyAccidentFreeRecord() {
		const lastDeath = await this._getLastDeath();
		if (!lastDeath) {
			return;
		}

		const diff = this._getDiffInSec(lastDeath.createdAt);
		if (diff < 60) {
			return;
		}

		const recordExpr =
			diff < 3600 ? `${Math.floor(diff / 60)}분` :
				`${Math.floor(diff / 3600)}시간`;

		const randomPhrases = [
			'오늘도 무사히!',
			'안전한 광질이 최고의 광질입니다',
			'안전제일!',
			'매월 4일은 안전점검의 날!'
		];
		const pickedPhrase = shuffle(randomPhrases)[0];
			
		this._mcApiRequester.requestBroadcast(
			`[SYSTEM] ${lastDeath.nickname}님 사망사고 이후 무사고 ${recordExpr} 달성! ${pickedPhrase}`
		);
	}

	_getDiffInSec(lastDeath) {
		return Math.floor((Date.now() - lastDeath.getTime()) / 1000);
	}

	async _getLastDeath() {
		const lastDeaths = await this._userEventRepository.findPlayerEvents({
			types: [ 'PlayerDeath' ],
			take: 1
		});
		if (lastDeaths.length === 0) {
			return null;
		}
		return lastDeaths[0];
	}
}

module.exports = {
	DefaultAccidentFreeNotifier
};
