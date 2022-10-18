import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import * as M from 'materialize-css';
import * as moment from 'moment';
import io from 'socket.io-client';
import * as _ from 'lodash';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  username: any;
  token: any;
  notifications: any = [] || undefined;
  socket: any;
  count: any = [] || undefined;
  // username: any;
  constructor(private tokenService: TokenService, private router: Router, private userService: UsersService) {
    this.socket = io('http://localhost:4500', { transports: ['websocket'] });
  }

  ngOnInit(): void {
    this.token = this.tokenService.GetPayload();
    this.username = this.token.username;

    const dropDownElement = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(dropDownElement!, {
      alignment: 'left',
      hover: true,
      coverTrigger: false
    })
    this.GetUser()
    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }

  logOut() {
    this.tokenService.DeleteToken();
    this.router.navigate(['/']);
  }
  markAll() {
    this.userService.MarkAllAsRead().subscribe(data => {
      console.log(data);
      this.socket.emit('refresh', {});
    })
  }

  GoToHome() {
    this.router.navigate(['streams']);
  }
  GetUser() {
    this.userService.GetUserById(this.token._id).subscribe(data => {
      // console.log(data);
      this.notifications = data.results.notifications.reverse();
      const value = _.filter(this.notifications, ['read', false]);
      this.count = value;
    }, err => {
      if (err.error.token == null) {
        this.tokenService.DeleteToken();
        this.router.navigate(['/']);
      }
    });
  }
  TimeFromNow(time: any) {
    return moment(time).fromNow();
  }

}
