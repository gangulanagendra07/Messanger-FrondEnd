import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  token: any;
  username: any;
  followers: any = [];
  socket: any;

  constructor(private tokenService: TokenService, private userService: UsersService) {
    this.socket = io('http://localhost:4500', { transports: ['websocket'] });
  }

  ngOnInit(): void {
    this.token = this.tokenService.GetPayload();
    this.username = this.token.username;
    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser()
    })
  }
  GetUser() {
    this.userService.GetUserById(this.token._id).subscribe((data) => {
      this.followers = data.results.followers;
      // console.log(data)
    }, err => {
      console.log(err);
    })
  }

}
