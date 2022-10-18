import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  receiver: any;
  user: any;
  message: any;
  receiverData: any = [];
  messagesArray: any = [];
  socket: any;

  constructor(private tokenService: TokenService, private messageService: MessageService, private route: ActivatedRoute, private userService: UsersService) {
    this.socket = io('http://localhost:4500', { transports: ['websocket'] });
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
    this.route.params.subscribe(params => {
      this.receiver = params.name;
      this.getUserByName(this.receiver);
      this.socket.on('refreshPage', () => {
        this.getUserByName(this.receiver);
      })
    })

  }

  getUserByName(name: any) {
    this.userService.GetUserByName(name).subscribe(data => {
      this.receiverData = data.results;
      this.GetAllMessages(this.user._id, data.results._id);
    })
  }
  GetAllMessages(senderId: any, receiverId: any) {
    this.messageService.getAllMessages(senderId, receiverId).subscribe(data => {
      console.log(data);
      this.messagesArray = data.messages.message;
    })
  }

  SendMessage() {
    if (this.message) {
      this.messageService.sendMessage(this.user._id, this.receiverData._id, this.receiver, this.message).subscribe(data => {
        console.log(data);
        this.socket.emit('refresh', {});
        this.message = "";

      })
    }

  }

}
