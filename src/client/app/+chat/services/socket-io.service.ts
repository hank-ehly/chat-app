/**
 * socket-io.service
 * chat-app
 *
 * Created by henryehly on 5/7/16.
 */

import { EventEmitter, Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { ChatMessage } from '../interfaces/chat-message.interface';
import { User } from '../interfaces/user.interface';

@Injectable()

export class SocketIOService {
  io: SocketIOClientStatic;
  connectionsUpdate: EventEmitter<any[]>;
  messageUpdate: EventEmitter<ChatMessage>;
  addChatUser: EventEmitter<User>;
  private socket: SocketIOClient.Socket;
  private socketUrl: string = 'http://localhost:3000';

  constructor() {
    this.messageUpdate = new EventEmitter<ChatMessage>();
    this.connectionsUpdate = new EventEmitter<any>();
    this.addChatUser = new EventEmitter<User>();
  }

  connect() {
    this.socket = io(this.socketUrl);
    this.socket.on('message', (message: ChatMessage) => this.messageUpdate.emit(message));
    this.socket.on('connections-update', () => this.connectionsUpdate.emit(null));
    this.socket.on('add-chat-user', (user: User) => this.addChatUser.emit(user));
  }

  addUserToChat(user: User) {
    this.socket.emit('add-chat-user', user);
  }

  broadcastMessage(message: ChatMessage) {
    this.socket.emit('message', message);
  }
}
