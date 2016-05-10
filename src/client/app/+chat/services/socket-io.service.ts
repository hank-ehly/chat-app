/**
 * socket-io.service
 * chat-app
 *
 * Created by henryehly on 5/7/16.
 */

import { EventEmitter, Injectable } from '@angular/core';
import Socket = SocketIOClient.Socket;

import { ChatMessage } from '../interfaces/chat-message.interface';

@Injectable()

export class SocketIOService {
  connectionsUpdate: EventEmitter<any[]>;
  messageUpdate: EventEmitter<ChatMessage>;
  private socket: Socket;
  private socketUrl: string = 'http://localhost:3000';

  constructor() {
    this.messageUpdate = new EventEmitter<ChatMessage>();
    this.connectionsUpdate = new EventEmitter<any>();
    this.connect();
  }

  connect() {
    this.socket = io(this.socketUrl);
    this.socket.on('message', (message: ChatMessage) => this.messageUpdate.emit(message));
    this.socket.on('user-connection', (data: any) => this.connectionsUpdate.emit(data.connections));
  }

  broadcastMessage(message: ChatMessage) {
    this.socket.emit('message', message);
  }
}
