import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamRoutingModule } from './stream-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { StreamComponent } from './stream.component';



@NgModule({
  declarations: [StreamComponent],
  imports: [
    CommonModule,
    StreamRoutingModule,
    SharedModule,
  ],
  // exports: [
  //   StreamComponent
  // ]
})
export class StreamModule { }
