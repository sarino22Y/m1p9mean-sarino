import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Router } from '@angular/router';
import { IUsers } from 'src/app/models/iusers';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  model!: IUsers;
  title!: string;
  responseData: any;
  curentRole: any;
  timer: any = "timer"
  
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private userService: UserService,
    private ngxService: NgxUiLoaderService
    ) { 
      localStorage.clear();
    }

  ngOnInit(): void {
    this.title = "Se connecter"
    this.createForm();
    this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    // Stop the foreground loading after 5s
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 5000);

  }


  createForm() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  get f(){
    return this.loginForm.controls;
  }

  /**
   * Aller dans la page register.
   */
  moveToRegister(){
    this.route.navigate(['user/register']);
  }

  /**
   * Méthode appellée par le boutton se connecter.
   * @returns 
   */
  login(){
    if (!this.loginForm.valid) {
      alert("Form invalide");
      return;      
    }
    this.model = this.loginForm.value;
    console.log("MODEL-------", this.model);
    
    this.userService.login(this.model)
    .subscribe({
      next: ( data:any ) => {
        this.responseData = data;
        localStorage.setItem('token',this.responseData.token.split(' ')[1]);
        this.userService.updateTheMenu.next();

        this.curentRole = this.userService.roleOfUserConnected();
        this.route.navigate([this.curentRole + '/dashboard']);
      },
      error: (e) => {
        console.error("EREURRR",e);
      }
    })
  }
}