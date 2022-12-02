import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { TokenService } from 'src/app/services/token.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import * as _ from 'lodash';




@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {


  socket: any;
  posts: any = [];
  user: any;

  constructor(private postService: PostService, private tokenService: TokenService, private router: Router) {
    this.socket = io("http://localhost:4500", { transports: ['websocket'] });
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
    this.getAllPosts();
    this.socket.on('refreshPage', () => {
      this.getAllPosts();
    })
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data.posts;
      console.log(data);
    }, err => {
      if (err.error.token == null) {
        this.tokenService.DeleteToken();
        this.router.navigate(['/']);
      }
    })
  }
  LikePost(post: any) {
    this.postService.addLike(post).subscribe((data) => {
      // console.log(data);
      this.socket.emit('refresh', {});
    }, err => {
      console.log(err);
    })
  }
  CheckInLikeArray(arr: any, username: any) {
    return _.some(arr, { username: username })
  }
  OpenCommentBox(post: any) {
    this.router.navigate(['post', post._id])
  }

  TimeFromNow(time: any) {
    return moment(time).fromNow();
  }

}
