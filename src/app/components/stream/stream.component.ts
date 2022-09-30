import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  token: any;
  username: any;

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    this.token = this.tokenService.GetPayload();
    this.username = this.token.username;
  }

  logOut() {
    this.tokenService.DeleteToken();
    this.router.navigate(['/']);
  }

}
