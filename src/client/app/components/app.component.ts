/**
 * app.component
 * chat-app
 *
 * Created by henryehly on 5/6/16.
 */

import { Component } from '@angular/core';

import { ChatComponent } from '../+chat/index';

@Component({
  selector: 'ch-app',
  templateUrl: 'app/components/app.component.html',
  directives: [ChatComponent]
})

export class AppComponent {}
