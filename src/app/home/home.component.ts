import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
 })


 login(){

 }
}
