/**
 * chat-message.service
 * chat-app
 *
 * Created by henryehly on 5/7/16.
 */

import {Injectable, EventEmitter} from 'angular2/core';
import {IChatMessage} from '../interfaces/chat-message.interface';
import {SocketIOService} from './socket-io.service';
import DEBUG from '../../shared/debug-log';
import {MockMessagesService} from './mock-messages.service';

@Injectable()

export class ChatMessageService {
  pushedNewMessage: EventEmitter<any>;
  private _messages: IChatMessage[];

  constructor(private _socketIOService: SocketIOService, private _mockMessagesService: MockMessagesService) {
    this._messages = [];
    this.pushedNewMessage = new EventEmitter();
    
    this._socketIOService.broadcastMessageUpdate.subscribe((message: IChatMessage) => {
      DEBUG(`Received broadcast message: `, message);
      this.pushMessage(message);
    });
    
    this._socketIOService.userMessageUpdate.subscribe((message: IChatMessage) => {
      DEBUG(`Received user message: `, message);
      this.pushMessage(message);
    });
  }

  pushMessage(message: IChatMessage) {
    this._messages.push(message);
    this.pushedNewMessage.emit(null);
  }

  get messages(): IChatMessage[] {
    return this._messages;
  }

  sendMessage(message: IChatMessage) {
    this._socketIOService.broadcastMessage(message);
  }

}
