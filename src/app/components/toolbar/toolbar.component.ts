import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import * as M from 'materialize-css';
import * as moment from 'moment';
import io from 'socket.io-client';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @Output() onlineUsers = new EventEmitter();
  username: any;
  token: any;
  notifications: any = [] || undefined;
  socket: any;
  count: any = [] || undefined;
  chatList: any = [] || undefined;
  msgNumber: any = 0;
  // username: any;
  constructor(private tokenService: TokenService, private router: Router, private userService: UsersService, private route: ActivatedRoute,
    private messageService: MessageService) {
    this.socket = io('http://localhost:4500', { transports: ['websocket'] });
  }

  ngOnInit(): void {
    this.token = this.tokenService.GetPayload();
    this.username = this.token.username;

    const dropDownElement = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropDownElement!, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    })
    const dropDownElementTwo = document.querySelectorAll('.dropdown-trigger1');
    M.Dropdown.init(dropDownElementTwo!, {
      alignment: 'left',
      hover: true,
      coverTrigger: false
    })
    this.socket.emit('online', { room: 'global', user: this.token.username });
    this.GetUser()
    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }

  ngAfterViewInit(): void {
    this.socket.on('usersOnline', (data: any) => {
      this.onlineUsers.emit(data);
    })
  }

  logOut() {
    this.tokenService.DeleteToken();
    this.router.navigate(['/']);
  }
  markAll() {
    this.userService.MarkAllAsRead().subscribe(data => {
      this.socket.emit('refresh', {});
    })
  }
  markAllMessages() {
    this.messageService.MarkAllMessages().subscribe((data) => {
      this.socket.emit('refresh', {});
      this.msgNumber = 0;
    })
  }

  GoToHome() {
    this.router.navigate(['streams']);
  }
  GoToChatPage(username: any) {
    this.router.navigate(['chat', username]);
    this.messageService.MarkMessages(this.token.username, username).subscribe((data) => {
      console.log(data);
      this.socket.emit('refresh', {});
    })
  }
  GetUser() {
    this.userService.GetUserById(this.token._id).subscribe(data => {
      // console.log(data);
      this.notifications = data.results.notifications.reverse();
      const value = _.filter(this.notifications, ['read', false]);
      this.count = value;
      this.chatList = data.results.chatList;
      this.CheckIfRead(this.chatList);
      console.log(this.msgNumber);
      // console.log(this.chatList);
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
  CheckIfRead(arr: any) {
    const checkArray = [];
    for (let i = 0; i < arr.length; i++) {
      const receiver = arr[i].msgId.message[arr[i].msgId.message.length - 1];

      if (this.router.url !== `/chat/${receiver.sendername}`) {
        if (receiver.isRead == false && receiver.receivername === this.token.username) {
          checkArray.push(1);
          this.msgNumber = _.sum(checkArray);
        }
      }

    }
  }
  MessageDate(data: any) {
    return moment(data).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: '[DD/MM/YYYY]',
      sameElse: '[DD/MM/YYYY]'
    })
  }

}
