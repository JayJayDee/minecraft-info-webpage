# Minecraft-Info-Webpage
An informational webpage for personal minecraft server.

# How to run
Before run, you must supply following environment variables, or you can use `dotenv` as an environment variables store. in that case, just place your `.env` file in your project root.
```bash
HTTP_PORT=55555
MINECRAFT_REST_HOST=http://127.0.0.1:4567
MYSQL_HOST=***
MYSQL_PORT=3306
MYSQL_USER=****
MYSQL_PASSWORD=***
MYSQL_DATABASE=***
DISABLE_CRONJOB=true
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
