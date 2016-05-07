/**
 * chat-message.service
 * chat-app
 *
 * Created by henryehly on 5/7/16.
 */

import {Injectable} from 'angular2/core';
import {IChatMessage} from '../interfaces/chat-message.interface';

@Injectable()

export class ChatMessageService {
  private _messages: IChatMessage[] = [
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

  get messages(): IChatMessage[] {
    return this._messages;
  }

  sendMessage(message: IChatMessage) {
    this._messages.push(message);
  }

}
