import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';
import * as moment from 'moment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  socket: any;
  token: any;
  username: any;
  notifications: any = [];


  constructor(private tokenService: TokenService, private userService: UsersService) {
    this.socket = io('http://localhost:4500', { transports: ['websocket'] });
  }

  ngOnInit(): void {
    this.token = this.tokenService.GetPayload();
    this.username = this.token.username;
    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    })
  }

  GetUser() {
    this.userService.GetUserById(this.token._id).subscribe((data) => {
      console.log(data);
      this.notifications = data.results.notifications.reverse();
    })
  }

  MarkNotification(data: any) {
    this.userService.MarkNotification(data._id).subscribe((value) => {
      this.socket.emit('refresh', {});
    })
  }

  DeleteNotification(data: any) {
    this.userService.MarkNotification(data._id, true).subscribe(() => {
      this.socket.emit('refresh', {});
    })
  }

  TimeFromNow(time: any) {
    return moment(time).fromNow();
  }

}
