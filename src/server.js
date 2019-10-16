import MySql from './db/mysql';
import Http from './http';
import Socket from './socket';
import RmLog from "rm-log";
import yaml from 'js-yaml';
import fs from 'fs';
import _ from 'lodash';

let log, config = null;
const logPrefix = 'SERVER  ';

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
	config = {
		server: {
			sleep: 100
		},
		log: {
			logfile: true,
			err: true,
			info: true,
			debug: true,
			msg: true,
			datePattern: 'yyyy-mm-dd HH:MM:ss',
			colors: {
				msg: 'green',
				info: 'blue',
				debug: 'cyan',
				err: 'gray'
			}
		},
		http: {
			port: 8080
		},
		socket: {
			logoutTokenTimeout: 10000,
			mail: {
				smtp: {
					from: 'ticketing@webcomplete.at',
					options: {
						port: 587,
						host: 'mail.your-server.de',
						logger: true,
						debug: true,
						tls: {
							rejectUnauthorized: false
						}
					},
					login: {
						credentials: {
							user: 'ticketing@webcomplete.at',
							pass: 'OfcDV84Ocs2u95M5'
						},
						oauth2: {
							user: null,
							clientId: null,
							clientSecret: null,
							refreshToken: null,
							accessToken: null
						}
					}
				}
			}
		},
		mysql: {
			debug: false,
			conn: {
				debug: false,
				host: 'localhost',
				user: 'ticketing_user',
				password: 'Passw0Rd!',
				database: 'ticketing_db',
				connectionLimit: 5,
				timezone: 'utc'
			}
		}
	}
}

global.LOG = new RmLog(config.log);
global.DB = new MySql(config.mysql);

function start() {
	if (config) {
		const http = new Http(config.http);
		global.SOCKET = new Socket(_.extend(config.socket, {'http': http.getServer()}));
		SOCKET.connections = 0;
		http.start();
		LOG.msg(logPrefix, 'sleep ' + (config.server.sleep / 1000) + ' second(s)');

		DB.promiseQuery('TRUNCATE TABLE memClientConn').then(res => {
			LOG.msg(logPrefix, 'removed all entries from \'memClientConn\'');
		}).catch(err => {
			LOG.err(logPrefix, 'could not remove from \'memClientConn\'');
			console.log(err);
		});
	} else {
		log.err(logPrefix, 'no configuration found');
	}
}

setTimeout(() => {
	start();
}, config.server.sleep);

