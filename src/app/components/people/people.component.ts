import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import * as _ from 'lodash';
import io from 'socket.io-client';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  token: any;
  username: any;
  users: any = [];
  userArray: any = [];
  socket: any;
  onlineUsers: any = [];
  // loggedUser: any;
  constructor(private tokenService: TokenService, private router: Router, private userService: UsersService) {
    this.socket = io('http://localhost:4500', { transports: ['websocket'] });
  }

  ngOnInit(): void {
    this.token = this.tokenService.GetPayload();
    this.username = this.token.username;
    this.GetUsers();
    this.GetUser()
    this.socket.on('refreshPage', () => {
      this.GetUsers();
      this.GetUser()
    })
  }

  GetUsers() {
    this.userService.GetAllUsers().subscribe(data => {
      _.remove(data.results, { username: this.username })
      this.users = data.results;

    })
  }
  GetUser() {
    this.userService.GetUserById(this.token._id).subscribe(data => {
      this.userArray = data.results.following;

    })
  }
  GetUsername() {
    this.userService.GetUserByName(this.username).subscribe(data => {

      // console.log(data)
    })
  }
  FollowUser(_user: any) {
    this.userService.FollowUser(_user._id).subscribe(data => {
      this.socket.emit('refresh', {});

    })
  }
  CheckedArray(arr: any, id: any) {
    const result = _.find(arr, ['userFollowed._id', id]);
    if (result) {
      return true;
    }
    else {
      return false;
    }
  }
  online(event: any) {
    this.onlineUsers = event;
  }

  checkIfOnline(name: any) {
    const result = _.indexOf(this.onlineUsers, name);
    if (result > -1) {
      return true;
    }
    else {
      return false;
    }
  }

}
