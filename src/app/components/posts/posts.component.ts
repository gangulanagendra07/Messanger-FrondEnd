import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import * as moment from 'moment';
import io from 'socket.io-client';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  socket: any;
  posts: any = [];

  constructor(private postService: PostService) {
    this.socket = io("http://localhost:4500", { transports: ['websocket'] });
  }

  ngOnInit(): void {
    this.getAllPosts();
    this.socket.on('refreshPage', () => {
      this.getAllPosts();
    })
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data.posts;
      console.log(this.posts);
    })
  }

  TimeFromNow(time: any) {
    return moment(time).fromNow();
  }

}
