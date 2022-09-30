import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StreamComponent } from '../components/stream/stream.component';
import { AuthGuard } from '../services/auth.guard';



const routes: Routes = [
  {
    path: 'streams', component: StreamComponent, canActivate: [AuthGuard]
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
