import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { FollowersRoutingModule } from './followers-routing.module';
import { FollowersComponent } from './followers.component';


@NgModule({
  declarations: [FollowersComponent],
  imports: [
    CommonModule,
    FollowersRoutingModule,
    SharedModule
  ]
})
export class FollowersModule { }
