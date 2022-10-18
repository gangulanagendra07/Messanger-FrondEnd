import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {

  socket: any;
  user: any;
  userData: any = [] || undefined;
  constructor(private tokenService: TokenService, private userService: UsersService) {
    this.socket = io('http://localhost:4500', { transports: ['websocket'] });
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    })

  }

  GetUser() {
    this.userService.GetUserById(this.user._id).subscribe((data) => {
      // console.log(data.results.posts.length);
      this.userData = data.results;
      // this.socket.emit('refresh', {});
    })
  }

}
