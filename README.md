# Minecraft-Info-Webpage
An informational webpage for personal minecraft server.

# How to run
Before run, you must supply following environment variables, or you can use `dotenv` as an environment variables store. in that case, just place your `.env` file in your project root.
```bash
HTTP_PORT=55555
EVENT_LISTENING_KEY=***
MINECRAFT_REST_HOST=http://127.0.0.1:4567
MYSQL_HOST=***
MYSQL_PORT=3306
MYSQL_USER=****
MYSQL_PASSWORD=***
MYSQL_DATABASE=***
ENABLE_MOCK_STATUS_FETCHER=true
```
then, you can run the project with following command.
```bash
npm start 
```

# The dependency injection rule
Each module have a `index.js` file as an entry of the module, it just loads another dependencies which required by the module, and instantiates the modules.


For example, the `server-status` module has a initializer named `initServerStatusModules()`, which can be called in another initializer with `getServerStatusModule()`


Calling the initializer in module, not an initializer is not recommended. (maybe occurs the circular dependency problem)

# The EventBroker API
the `EventBroker` implementations allows to each modules to stream events from player's action. you can subscribe some topics that publishes event from producers.

## Usage roadmap
- ~~the `CronJobApp` will be replaced with this `EventBroker` API, for time-related notifications.~~ - DONE
- ~~the `TgApp` will use the `EventBroker` for subscribe Player chats event~~ - DONE

## Example
```javascript
const { WellKnownTopics } = require('../well-known-topics');
const broker = getEventBroker();

const subscriptionId =
	broker.subscribe(WellKnownTopics.CHAT(), (payload) => {
		// do something with payload
	});

// use your subscriptionId for unsubscribe()
broker.unsubscribe(subscriptionId);
```
for more example for `EventBroker` uses, see the following codes:
- `/src/player-event-recorder/index.js`
- `/src/cronjob-app/index.js`

## Well-known topics
- `WellKnownTopics.CHAT()` - Player chat event - `ChatEventVO`
- `WellKnownTopics.DEATH()` - Player death event - `DeathEventVO`
- `WellKnownTopics.JOIN()` - Player join event - `JoinEventVO` 
- `WellKnownTopics.QUIT()` - Player quit event - `QuitEventVO`
- `WellKnownTopics.TIME_HOURLY()` - Hourly event - `HourlyEventVO` 
- `WellKnownTopics.TIME_EVERY_MINUTE()` - every-minute event - `MinutelyEventVO`
- `WellKnownTopics.TIME_EVERYDAY_MIDNIGHT()` - everyday midnight 0 am - `DailyEventVO`

# Roadmap
- ~~?????????????????? ?????? ????????? ??? ?????? ????????? ??????~~ DONE (by hwook)
- ~~???????????? ?????? ??? ?????? ????????? ??????~~ DONE (by JayJayDee)
- ~~?????? ????????? ????????? ?????? ????????? ????????? n ?????? ?????????, ????????? n????????? ??? ?????? 1?????? notify~~ DONE (by JayJayDee)
- ~~?????? ?????? Daily backup ??? S3??? ????????? ????????? (5????????? ??????)~~ DONE (by JayJayDee)
- ???????????? ????????? ????????? ??? ????????? ??????
