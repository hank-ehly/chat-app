/**
 * chat.component
 * chat-app
 *
 * Created by henryehly on 5/6/16.
 */

import {Component} from 'angular2/core';
import {IChatMessage} from '../interfaces/chat-message.interface';

@Component({
  selector: 'ch-comp',
  templateUrl: 'app/+chat/components/chat.component.html',
  styleUrls: ['app/+chat/components/chat.component.css']
})

export class ChatComponent {
  chatMessage: string;
  mockMessages: IChatMessage[] = [
    {text: 'Hey!', isOwner: false},
    {text: 'What\'s Up?', isOwner: true},
    {text: 'Nothin what r u doin?', isOwner: false},
    {text: 'Just chillin at home...', isOwner: true},
    {text: 'Wanna go out or something?', isOwner: false},
    {text: 'Sure what do you wanna do?', isOwner: true},
    {text: 'Idk you?', isOwner: false},
    {
      text: 'I don\'t really know.. I guess we could check out that new place downtown. I hear they have some cool stuff.',
      isOwner: true
    },
    {text: 'Yea sure that\'d be cool what time should i come get you?', isOwner: false},
    {text: 'Thanks for offering could you come around 5?', isOwner: true},
    {
      text: 'Yea sure i think i have to help out with something around the house before I can leave so it\'ll be around 5:15 i think',
      isOwner: false
    },
    {text: 'np', isOwner: true},
    {text: 'alright', isOwner: false},
    {text: 'cya at 5:15', isOwner: true},
    {text: 'later', isOwner: false}
  ];

  getMessageStyle(message: IChatMessage) {
    return {
      'owner-message': message.isOwner,
      'non-owner-message': !message.isOwner
    };
  }

  onSend() {
    console.log(this.chatMessage);
    let newMessage: IChatMessage = {text: this.chatMessage, isOwner: true};
    this.mockMessages.push(newMessage);
    this.chatMessage = '';
  }
}
