/**
 * chat-message.service
 * chat-app
 *
 * Created by henryehly on 5/7/16.
 */

import { EventEmitter, Injectable } from '@angular/core';

import { ChatMessage } from '../interfaces/chat-message.interface';
import DEBUG from '../../shared/debug-log';
import { SocketIOService } from './socket-io.service';

@Injectable()

export class ChatMessageService {
  pushedNewMessage: EventEmitter<any>;
  messages: ChatMessage[];

  constructor(private socketIOService: SocketIOService) {
    this.messages = [];
    this.pushedNewMessage = new EventEmitter();

    this.socketIOService.messageUpdate.subscribe((message: ChatMessage) => {
      DEBUG('Received message: ', message);
      this.messages.push(message);
      this.pushedNewMessage.emit(null);
    });
  }

  sendMessage(message: ChatMessage) {
    this.socketIOService.broadcastMessage(message);
  }

}
