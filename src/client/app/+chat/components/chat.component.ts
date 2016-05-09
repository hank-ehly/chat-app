/**
 * chat.component
 * chat-app
 *
 * Created by henryehly on 5/6/16.
 */

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChatMessage } from '../interfaces/chat-message.interface';
import { ChatMessageService } from '../services/chat-message.service';
import { SocketIOService } from '../services/socket-io.service';

@Component({
  selector: 'ch-comp',
  templateUrl: 'app/+chat/components/chat.component.html',
  styleUrls: ['app/+chat/components/chat.component.css'],
  providers: [ChatMessageService, SocketIOService]
})

export class ChatComponent implements OnInit, AfterViewInit {
  user: {name: string};
  username: string;
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
      'owner-message': message.username === this.user.name,
      'non-owner-message': message.username !== this.user.name
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
    let message = <ChatMessage>{text: this.userMessage, username: this.user.name};
    this._chatMessageService.sendMessage(message);
    this.userMessage = '';
  }

  onSubmit() {
    this.user = {name: this.username};
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
