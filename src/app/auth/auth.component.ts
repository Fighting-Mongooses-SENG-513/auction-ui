import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  createAccountForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    auctioneer: [false , Validators.required]
  });

  constructor(public formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
    }
  }

  onCreateAccount() {
    if (this.createAccountForm.valid) {
      this.authService.createUser(this.createAccountForm.controls.email.value, this.createAccountForm.controls.password.value,
        this.createAccountForm.controls.auctioneer.value);
    }
  }

}
