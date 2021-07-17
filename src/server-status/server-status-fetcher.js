const { ChatEventVO, DeathEventVO } = require('../event-producers/vo');
const { PlaytimeVO } = require('../repositories/vo/playtime-vo');

class ServerStatusFetcher {

	constructor({
		serverStatusRepository,
		userPlaytimeRepository,
		userEventRepository,
		logger
	}) {
		this._serverStatusRepo = serverStatusRepository,
		this._userPlaytimeRepository = userPlaytimeRepository;
		this._userEventRepository = userEventRepository;
		this._logger = logger;
	}

	async fetch() {
		const allPlayers = await this._serverStatusRepo.findAllPlayers();
		const onlinePlayers = await this._serverStatusRepo.findOnlinePlayers();

		return {
			allPlayers,
			onlinePlayers
		};
	}

	async playtimeRanks({
		take
	} = {}) {
		const allPlayers = await this._serverStatusRepo.findAllPlayers();
		const allRecords = await this._userPlaytimeRepository.findPlaytimes();

		const convertedAllPlayers =
			allPlayers.map(p => {
				const foundRecord = allRecords.find(r => r.uuid === p.uuid);
				return new PlaytimeVO({
					uuid: p.uuid,
					nickname: p.nickname,
					minPlayed: foundRecord ? foundRecord.minPlayed : undefined,
					lastPlayedTime: foundRecord ? foundRecord.lastPlayedTime : undefined
				});
		});

		const sorted =
			convertedAllPlayers.sort((a, b) =>
				a.minPlayed > b.minPlayed ? -1 : 1);

		if (take === undefined) {
			return sorted;
		}
		return sorted.slice(0, take);
	}

	async latestChats({
		take
	} = {}) {
		const playerEvents = await this._userEventRepository.findPlayerEvents({
			types: ['PlayerChat', 'PlayerJoin', 'PlayerQuit'],
			take: take ? take : 20
		})
		return playerEvents.map(ChatEventVO.fromPlayerEventVO);
	}

	async latestDeathForMainScene() {
		const lastDeaths = await this._userEventRepository.findPlayerEvents({
			types: [ 'PlayerDeath' ],
			take: 1
		});
		if (lastDeaths.length === 0) {
			return null;
		}

		const deathEventVO = DeathEventVO.fromPlayerEventVO(lastDeaths[0]);
		const diffFromNow = Math.floor((Date.now() - deathEventVO.createdAt.getTime()) / 1000);

		// 1시간이 
		if (diffFromNow < 3600) {
			return null;
		}
		return deathEventVO;
	}
}

module.exports = { 
	ServerStatusFetcher
};
