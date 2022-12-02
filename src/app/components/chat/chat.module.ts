import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { MessageComponent } from '../message/message.component';


@NgModule({
  declarations: [ChatComponent, MessageComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    EmojiModule,
    SharedModule
  ],
  exports: [
    EmojiModule
  ]
})
export class ChatModule { }
