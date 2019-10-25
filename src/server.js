import MySql from './db/mysql';
import Http from './http';
import Socket from './socket';
import RmLog from "rm-log";
import yaml from 'js-yaml';
import fs from 'fs';
import _ from 'lodash';

let log, config, http = null;
const logPrefix = 'node    ';

function loadConfig() {
	try {
		config = yaml.safeLoad(fs.readFileSync('./config.yaml', 'utf8'));
		if (config.log) {
			log = new RmLog(config.log);
			log.msg(logPrefix, config);
		} else {
			config = null;
			console.error('no config for log found.');
		}
	} catch (e) {
		console.error(e);
		new Error('no configuration file config.yaml found!');
		process.exit(1);
	}

	global.LOG = new RmLog(config.log);
	global.FILES = __dirname + '/../files';

	// check for files directory (if not exists create)
	// only for local development (in docker container this will be a separate volume)
	try {
		if (!fs.existsSync(FILES)) {
			LOG.msg(logPrefix, 'files directory does not exist!');
			fs.mkdirSync(FILES);
			LOG.msg(logPrefix, 'files directory created at "' + FILES + '"');
		} else {
			LOG.msg(logPrefix, 'files directory exists at "' + FILES + '"');
		}
	} catch (e) {
		console.error(e);
		new Error('can´t create files directory!');
		process.exit(1);
	}
}

function start() {
	if (config) {

		global.DB = new MySql(config.mysql);
		DB.promiseQuery('TRUNCATE TABLE memClientConn').then(res => {
			LOG.msg(logPrefix, 'removed all entries from \'memClientConn\'');
		}).catch(err => {
			LOG.err(logPrefix, 'could not remove from \'memClientConn\'');
			console.log(err);
			LOG.msg(logPrefix, 'try to restart in 5 seconds => maybe try to change config settings in config.yaml');
			LOG.msg(logPrefix, 'check if database settings are correct and database server (container) is running');
			setTimeout(() => {
				loadConfig();
				start();
			}, 5000);
		});

		if (http === null) {
			http = new Http(config.http);
			global.SOCKET = new Socket(_.extend(config.socket, {'http': http.getServer()}));
			SOCKET.connections = 0;
			http.start();
		}
	} else {
		log.err(logPrefix, 'no configuration found');
	}
}

loadConfig();

LOG.msg(logPrefix, 'sleep ' + (config.server.sleep / 1000) + ' second(s)');
setTimeout(() => {
	LOG.msg(logPrefix, 'start server now');
	start();
}, config.server.sleep);

