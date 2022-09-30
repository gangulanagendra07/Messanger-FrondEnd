import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() username: any;
  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this.tokenService.DeleteToken();
    this.router.navigate(['/']);
  }


}
