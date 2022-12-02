import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from '../services/jwt.interceptor';


import { FileUploadModule } from 'ng2-file-upload';
import { NgxAutoScrollModule } from "ngx-auto-scroll";
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';

import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SideComponent } from '../components/side/side.component';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { PostsComponent } from '../components/posts/posts.component';
import { TopStreamsComponent } from '../components/top-streams/top-streams.component';
import { FollowersComponent } from '../components/followers/followers.component';
import { FollowingComponent } from '../components/following/following.component';
import { PeopleComponent } from '../components/people/people.component';
import { TokenService } from '../services/token.service';
import { PostService } from '../services/post.service';
import { UsersService } from '../services/users.service';
import { MessageService } from '../services/message.service';





@NgModule({
  declarations: [
    ToolbarComponent,
    SideComponent,
    PostFormComponent,
    PostsComponent,
    TopStreamsComponent,
  ],
  exports: [
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxAutoScrollModule,
    PickerModule,
    EmojiModule,
    FileUploadModule,
    ToolbarComponent,
    SideComponent,
    PostFormComponent,
    PostsComponent,
    TopStreamsComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxAutoScrollModule,
    PickerModule,
    EmojiModule,
    FileUploadModule
  ],
  providers: [TokenService, PostService, UsersService, MessageService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }]
})
export class SharedModule { }
