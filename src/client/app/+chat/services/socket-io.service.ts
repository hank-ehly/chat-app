/**
 * socket-io.service
 * chat-app
 *
 * Created by henryehly on 5/7/16.
 */

import { Injectable, EventEmitter } from '@angular/core';
import Socket = SocketIOClient.Socket;
import { ChatMessage } from '../interfaces/chat-message.interface';

@Injectable()

export class SocketIOService {
  messageUpdate: EventEmitter<ChatMessage>;
  connectionsUpdate: EventEmitter<any[]>;
  private _socket: Socket;
  private _socketUrl: string = 'http://localhost:3000';

  constructor() {
    this.messageUpdate = new EventEmitter<ChatMessage>();
    this.connectionsUpdate = new EventEmitter<any>();

    this.openSocket();
  }

  openSocket() {
    this._socket = io(this._socketUrl);
    this._socket.on('message', (message: ChatMessage) => this.messageUpdate.emit(message));
    this._socket.on('user-connection', (data: any) => this.connectionsUpdate.emit(data.connections));
  }

  broadcastMessage(message: ChatMessage) {
    this._socket.emit('message', message);
  }
}
