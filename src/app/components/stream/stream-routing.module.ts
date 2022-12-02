import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StreamComponent } from './stream.component';

const routes: Routes = [
  {
    path: '',
    component: StreamComponent
  },
  {
    path: '**',
    redirectTo: 'streams',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StreamRoutingModule { }
