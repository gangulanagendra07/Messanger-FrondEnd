import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class MessageComponent implements OnInit, AfterViewInit {

  receiver: any;
  user: any;
  message: any = "";
  receiverData: any = [];
  messagesArray: any = [];
  socket: any;
  emoji: any;
  typingMessage: any;
  typing: boolean = false;
  isEmojiPickerVisible: boolean | undefined;

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
    });
    this.socket.on('is_typing', (_data: any) => {
      if (_data.sender === this.receiver) {
        this.typing = true;
      }
    })

    this.socket.on('has_stopped_typing', (_data: any) => {
      if (_data.sender === this.receiver) {
        this.typing = false;
      }
    })

  }
  ngAfterViewInit(): void {
    const params = {
      room1: this.user.username,
      room2: this.receiver
    }

    this.socket.emit('join chat', params);
  }

  getUserByName(name: any) {
    this.userService.GetUserByName(name).subscribe(data => {
      this.receiverData = data.results;
      this.GetAllMessages(this.user._id, data.results._id);
    })
  }

  addEmoji(event: any) {
    this.message = `${this.message}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  IsTyping() {
    this.socket.emit('start_typing', {
      sender: this.user.username,
      receiver: this.receiver
    })
    if (this.typingMessage) {
      clearTimeout(this.typingMessage)
    }

    this.typingMessage = setTimeout(() => {
      this.socket.emit('stop_typing', {
        sender: this.user.username,
        receiver: this.receiver
      })
    }, 500)
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
