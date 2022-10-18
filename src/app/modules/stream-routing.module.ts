import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StreamComponent } from '../components/stream/stream.component';
import { AuthGuard } from '../services/auth.guard';
import { CommentsComponent } from '../components/comments/comments.component';
import { PeopleComponent } from '../components/people/people.component';
import { FollowingComponent } from '../components/following/following.component';
import { FollowersComponent } from '../components/followers/followers.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { ChatComponent } from '../components/chat/chat.component';



const routes: Routes = [
  {
    path: 'streams', component: StreamComponent, canActivate: [AuthGuard]
  },
  {
    path: 'post/:id', component: CommentsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'people', component: PeopleComponent, canActivate: [AuthGuard]
  },
  {
    path: 'following', component: FollowingComponent, canActivate: [AuthGuard]
  },
  {
    path: 'followers', component: FollowersComponent, canActivate: [AuthGuard]
  },
  {
    path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'chat/:name', component: ChatComponent, canActivate: [AuthGuard]
  }
]


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class StreamRoutingModule { }
