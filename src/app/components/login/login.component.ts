import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;
  showSpinner = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLogin() {
    this.showSpinner = true;
    this.authService.login(this.loginForm.value).subscribe((userData) => {
      // console.log(userData);
      this.tokenService.SetToken(userData.token);
      this.loginForm.reset();
      setTimeout(() => {
        this.router.navigate(['streams']);
      }, 2000);

    }, err => {
      this.showSpinner = false;
      if (err.error.msg) {
        this.errorMessage = err.error.msg[0].message;
      }
      if (err.error.message) {
        this.errorMessage = err.error.message;
      }
    })

  }

}
