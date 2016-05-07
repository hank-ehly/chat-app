/**
 * chat.component
 * chat-app
 *
 * Created by henryehly on 5/6/16.
 */

import {Component, OnInit, AfterViewInit} from 'angular2/core';
import {IChatMessage} from '../interfaces/chat-message.interface';
import {ChatMessageService} from '../services/chat-message.service';
import {SocketIOService} from '../services/socket-io.service';
import {MockMessagesService} from '../services/mock-messages.service';

@Component({
  selector: 'ch-comp',
  templateUrl: 'app/+chat/components/chat.component.html',
  styleUrls: ['app/+chat/components/chat.component.css'],
  providers: [ChatMessageService, SocketIOService, MockMessagesService]
})

export class ChatComponent implements OnInit, AfterViewInit {
  userMessage: string;
  messages: IChatMessage[];

  constructor(private _chatMessageService: ChatMessageService) {
    this._chatMessageService.pushedNewMessage.subscribe(() => {
      this._adjustScrollPosition();
    });
  }

  ngOnInit() {
    this.messages = this._chatMessageService.messages;
  }

  ngAfterViewInit() {
    this._adjustScrollPosition();
  }

  getMessageStyle(message: IChatMessage) {
    return {
      'owner-message': message.isOwner,
      'non-owner-message': !message.isOwner
    };
  }

  onSend() {
    let message: IChatMessage = {text: this.userMessage, isOwner: true};
    this._chatMessageService.sendMessage(message);
    this.userMessage = '';
  }

  private _adjustScrollPosition() {
    setTimeout(() => {
      let objDiv = document.getElementById('message-container');
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 0);
  }
}

