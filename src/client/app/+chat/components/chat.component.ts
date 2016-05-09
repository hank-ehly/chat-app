/**
 * chat.component
 * chat-app
 *
 * Created by henryehly on 5/6/16.
 */

import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ChatMessage} from '../interfaces/chat-message.interface';
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
  user: any;
  userMessage: string;
  messages: ChatMessage[];
  connections: string[];

  constructor(private _chatMessageService: ChatMessageService, private _socketIOService: SocketIOService) {
    this.connections = [];

    this._chatMessageService.pushedNewMessage.subscribe(() => {
      this._adjustScrollPosition();
    });

    this._socketIOService.connectionsUpdate.subscribe((_connections: string[]) => {
      this.connections = _connections;
    });
  }

  ngOnInit() {
    this.messages = this._chatMessageService.messages;
  }

  ngAfterViewInit() {
    this._adjustScrollPosition();
  }

  getMessageStyle(message: ChatMessage) {
    return {
      'owner-message': message.isOwner,
      'non-owner-message': !message.isOwner
    };
  }

  onEnter(e: KeyboardEvent) {
    e.preventDefault();
    if (!this.userMessage) {
      return;
    }
    this.onSend();
  }

  onSend() {
    let message = <ChatMessage>{text: this.userMessage, isOwner: true};
    this._chatMessageService.sendMessage(message);
    this.userMessage = '';
  }

  private _adjustScrollPosition() {
    let objDiv = document.getElementById('message-container');
    if (!objDiv) {
      return;
    }
    setTimeout(() => {
      let objDiv = document.getElementById('message-container');
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 0);
  }
}
