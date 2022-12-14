import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxAutoScrollModule } from "ngx-auto-scroll";
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { StreamComponent } from '../components/stream/stream.component';
import { TokenService } from '../services/token.service';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SideComponent } from '../components/side/side.component';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { PostsComponent } from '../components/posts/posts.component';
import { PostService } from '../services/post.service';
import { MessageService } from '../services/message.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentsComponent } from '../components/comments/comments.component';
import { RouterModule } from '@angular/router';
import { PeopleComponent } from '../components/people/people.component';
import { UsersService } from '../services/users.service';
import { FollowingComponent } from '../components/following/following.component';
import { FollowersComponent } from '../components/followers/followers.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { TopStreamsComponent } from '../components/top-streams/top-streams.component';
import { ChatComponent } from '../components/chat/chat.component';
import { MessageComponent } from '../components/message/message.component';
import { ImagesComponent } from '../components/images/images.component';
import { UnauthorizedComponent } from '../components/unauthorized/unauthorized.component';
import { ViewUserComponent } from '../components/view-user/view-user.component';


@NgModule({
  declarations: [
    // StreamComponent,
    // ToolbarComponent,
    // SideComponent,
    // PostFormComponent,
    // PostsComponent,
    // CommentsComponent,
    // PeopleComponent,
    // FollowingComponent,
    // FollowersComponent,
    //NotificationsComponent,
    // // TopStreamsComponent,
    // ChatComponent,
    // MessageComponent,
    // ImagesComponent,
    UnauthorizedComponent,
    // ViewUserComponent
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
  exports: [
    // StreamComponent,
    // ToolbarComponent,
    // SideComponent,
    // PostFormComponent,
    // PostsComponent,
    // CommentsComponent,
    // PeopleComponent,
    // FollowingComponent,
    // FollowersComponent,
    //NotificationsComponent,
    // TopStreamsComponent,
    // ChatComponent,
    // MessageComponent,
    // ImagesComponent,
    UnauthorizedComponent,
    // ViewUserComponent
  ],
  providers: [TokenService, PostService, UsersService, MessageService]
})
export class StreamModule { }
