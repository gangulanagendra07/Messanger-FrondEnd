import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import * as M from 'materialize-css';


@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  token: any;
  username: any;
  streamsTab: boolean = false;
  topStreamsTab: boolean = false;
  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    this.streamsTab = true;
    this.token = this.tokenService.GetPayload();
    this.username = this.token.username;
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs!, {});
  }

  ChangeTab(value: any) {
    if (value === 'streams') {
      this.streamsTab = true;
      this.topStreamsTab = false;
    }
    if (value === 'top') {
      this.streamsTab = false;
      this.topStreamsTab = true;
    }
  }

  logOut() {
    this.tokenService.DeleteToken();
    this.router.navigate(['/']);
  }

}
