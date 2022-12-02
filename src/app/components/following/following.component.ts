import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  token: any;
  username: any;
  following: any = [];
  socket: any;

  constructor(private tokenService: TokenService, private userService: UsersService) {
    this.socket = io('http://localhost:4500', { transports: ['websocket'] });
  }

  ngOnInit(): void {
    this.token = this.tokenService.GetPayload();
    this.username = this.token.username;
    this.GetUser()
    this.socket.on('refreshPage', () => {
      this.GetUser()
    })
  }

  GetUser() {
    this.userService.GetUserById(this.token._id).subscribe((data) => {
      // console.log(data);
      this.following = data.results.following;
    }, err => {
      console.log(err);
    })
  }
  UnFollowedUser(_user: any) {
    this.userService.UnFollowUser(_user._id).subscribe(data => {
      this.socket.emit('refresh', {});
    })
  }

}
