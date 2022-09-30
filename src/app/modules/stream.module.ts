import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamComponent } from '../components/stream/stream.component';
import { TokenService } from '../services/token.service';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SideComponent } from '../components/side/side.component';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { PostsComponent } from '../components/posts/posts.component';
import { PostService } from '../services/post.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    StreamComponent,
    ToolbarComponent,
    SideComponent,
    PostFormComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    StreamComponent,
    ToolbarComponent,
    SideComponent,
    PostFormComponent,
    PostsComponent
  ],
  providers: [TokenService, PostService]
})
export class StreamModule { }
