import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin } from '../login';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Observable, of, throwError } from "rxjs";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: ILogin = { user: "myAdmin", password: "myAdminPassword", token: null, message: null };
  authService: AuthService = inject(AuthService);
  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  hide: boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigate(['/company']);
    } else {
      this.router.navigate(['/login']);
    }

    // How to create a FormGroup by means of FormBuilder and adding multiple validators
    // Validators are checked runtime in dom (see login.component.html) using ngIf directive
    this.loginForm = this.formBuilder.group({
      userid: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3), Validators.pattern('[a-zA-z]+')]],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(3)]]
    });
    this.returnUrl = '/company';
    // this.authService.logout();
    console.log(this.loginForm.get('userid'))
  }
  get f() { return this.loginForm.controls; }

  login() {

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    else {

      this.credentials.user = this.f['userid'].value;
      this.credentials.password = this.f['password'].value;

      this.authService.login(this.credentials)
      .subscribe((credentials: ILogin) => {
        if(this.credentials.token == null){
          this.message = this.credentials.message;
        }
        else {
          this.router.navigate([this.returnUrl]);
          window.location.reload(); // Reload the entire application to update menù (Login is replaced from Logout)
        }          
      })
    }
  }

  myFunction() {
    this.hide = !this.hide;
  }
}
