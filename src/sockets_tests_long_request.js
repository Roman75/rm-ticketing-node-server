import Helpers from './helpers';

/**
 * sockets tests long request
 * @public
 * @class
 * @memberof Socket
 */
class SocketsTestsLongRequest extends Helpers {

	/**
	 * constructor for user socket events<br>
	 * @param client {Object} socket.io connection object
	 */
	constructor(client) {
		super();
		this._client = client;
		this.onRequest();
	}

	/**
	 * request and wait milliseconds to respond to client
	 * @example
	 * socket.on('sockets-tests-long-request', (res)=>{console.log(res);}); // milliseconds over respond
	 * socket.on('sockets-tests-long-request-err', (err)=>{console.log(err);}); // error occurred
	 * socket.emit('sockets-tests-long-request', {
	 * 	'Timeout': 10000		// wait and respond in milliseconds
	 * });
	 */
	onRequest() {
		const evt = 'sockets-tests-long-request';
		this._client.on(evt, (req) => {
			let wait = (req.Timeout) ? req.Timeout : 1000;
			this.logSocketMessage(this._client.id, evt, 'started');
			setTimeout(() => {
				this._client.emit(evt, {'Timeout': wait});
				this.logSocketMessage(this._client.id, evt, 'response');
			}, wait);
		});
	}
}

module.exports = SocketsTestsLongRequest;
