/**
 * chat-message.service
 * chat-app
 *
 * Created by henryehly on 5/7/16.
 */

import { Injectable, EventEmitter } from '@angular/core';
import { ChatMessage } from '../interfaces/chat-message.interface';
import { SocketIOService } from './socket-io.service';
import DEBUG from '../../shared/debug-log';

@Injectable()

export class ChatMessageService {
  pushedNewMessage: EventEmitter<any>;
  private _messages: ChatMessage[];

  constructor(private _socketIOService: SocketIOService) {
    this._messages = [];
    this.pushedNewMessage = new EventEmitter();

    this._socketIOService.messageUpdate.subscribe((message: ChatMessage) => {
      DEBUG(`Received message: `, message);
      this._messages.push(message);
      this.pushedNewMessage.emit(null);
    });
  }

  get messages(): ChatMessage[] {
    return this._messages;
  }

  sendMessage(message: ChatMessage) {
    this._socketIOService.broadcastMessage(message);
  }

}
