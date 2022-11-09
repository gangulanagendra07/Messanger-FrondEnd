import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  tabElement: any;
  online_Users: any = [];
  constructor() { }

  ngOnInit(): void {
    this.tabElement = document.querySelector('.nav-content')
  }

  ngAfterViewInit() {
    this.tabElement.style.display = 'none';
  }
  online(event: any) {
    this.online_Users = event;
  }
}
