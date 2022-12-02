import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UsersService) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.passwordForm = this.fb.group({
      cPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.validate.bind(this)
    })
  }

  ChangePassword() {
    this.userService.ChangePassword(this.passwordForm.value).subscribe(data => {
      console.log(data);
      this.passwordForm.reset();
    }, err => {
      console.log(err);
    })
    // this.passwordForm.reset();
  }

  validate(passwordFormGroup: FormGroup) {
    const new_password = passwordFormGroup.controls.newPassword.value;
    const confirm_password = passwordFormGroup.controls.confirmPassword.value;
    // console.log(confirm_password);

    // if (confirm_password.length <= 0) {
    //   return null;
    // }
    if (confirm_password !== new_password) {
      return {
        doNotMatch: true
      }
    }
    return null;
  }

}
