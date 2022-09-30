import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  errorMessage!: string;
  showSpinner = false;
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }
  onSubmit() {
    this.showSpinner = true;
    this.authService.register(this.signupForm.value).subscribe((userData) => {
      this.tokenService.SetToken(userData.token);
      this.signupForm.reset();
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
