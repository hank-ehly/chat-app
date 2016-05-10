/**
 * chat.component
 * chat-app
 *
 * Created by henryehly on 5/6/16.
 */

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SocketIOService } from '../services/socket-io.service';

import { ChatMessage } from '../interfaces/chat-message.interface';
import { ChatMessageService } from '../services/chat-message.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'ch-comp',
  templateUrl: 'app/+chat/components/chat.component.html',
  styleUrls: ['app/+chat/components/chat.component.css'],
  providers: [ChatMessageService, SocketIOService]
})

export class ChatComponent implements OnInit, AfterViewInit {
  user: User;
  username: string;
  userMessage: string;
  connectedUsers: User[];
  messages: ChatMessage[];

  constructor(private chatMessageService: ChatMessageService, private socketIOService: SocketIOService) {
    this.connectedUsers = [];
    this.chatMessageService.pushedNewMessage.subscribe(() => this.adjustScrollPosition());
    this.socketIOService.connectionsUpdate.subscribe(() => this.socketIOService.addUserToChat(this.user));
    this.socketIOService.addChatUser.subscribe((user: User) => this.connectedUsers.push(user));
  }

  ngOnInit() {
    this.messages = this.chatMessageService.messages;
  }

  ngAfterViewInit() {
    this.adjustScrollPosition();
  }

  getMessageStyle(message: ChatMessage) {
    let isUserMessage = message.username === this.user.name;

    return {
      'owner-message': isUserMessage,
      'non-owner-message': !isUserMessage
    };
  }

  enter(e: KeyboardEvent) {
    e.preventDefault();
    if (!this.userMessage) {
      return;
    }
    this.send();
  }

  send() {
    let message: ChatMessage = {text: this.userMessage, username: this.user.name};
    this.chatMessageService.sendMessage(message);
    this.userMessage = '';
  }

  submit() {
    this.user = {name: this.username};
    this.socketIOService.connect();
  }

  private adjustScrollPosition() {
    let messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }
}
