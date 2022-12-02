import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  token: any;
  constructor(private router: Router, private tokenService: TokenService) { }
  ngOnInit(): void {
    this.token = this.tokenService.GetToken();

    // if (this.token) {
    //   this.router.navigate(['streams'])
    // } else {
    //   this.router.navigate(['/']);
    // }
  }

}
