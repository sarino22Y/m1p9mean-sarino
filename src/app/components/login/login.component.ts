import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  moveToRegister(){
    this.route.navigate(['user/register']);
  }

  login(){
    if (!this.loginForm.valid) {
      console.log("Form invalide");
      return;      
    }
    console.log(JSON.stringify(this.loginForm.value));
    
  }
}