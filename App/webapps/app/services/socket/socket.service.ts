import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import global = require('./../../globals/globals');

@Injectable()
export class SingletonSocket {

	socket: any;

	constructor() {
		this.socket = io(global.socketUrl);
		this.socket.on('connection', function () {
			console.log("Connected...");
		});
	}

	/**
	 * Create event listener from socket
	 */
	getDataFromSocket(message:any, callback:any) {
		this.socket.on(message, function (data:any) {
			callback(data);
		});
	}

}