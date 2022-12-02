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
import { ImagesComponent } from '../components/images/images.component';
import { UnauthorizedComponent } from '../components/unauthorized/unauthorized.component';
import { ViewUserComponent } from '../components/view-user/view-user.component';



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
  },
  {
    path: 'images/:name', component: ImagesComponent, canActivate: [AuthGuard]
  },
  {
    path: ':name', component: ViewUserComponent, canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/UnauthorizedComponent'
  }
]


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })
  ],
  exports: [
    RouterModule
  ]
})
export class StreamRoutingModule { }
