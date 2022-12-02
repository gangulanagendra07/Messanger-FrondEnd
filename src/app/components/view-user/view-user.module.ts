import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { ViewUserRoutingModule } from './view-user-routing.module';
import { ViewUserComponent } from './view-user.component';


@NgModule({
  declarations: [ViewUserComponent],
  imports: [
    CommonModule,
    ViewUserRoutingModule,
    SharedModule
  ]
})
export class ViewUserModule { }
