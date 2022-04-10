import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsers } from 'src/app/models/iusers';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-loginrestaurant',
  templateUrl: './loginrestaurant.component.html',
  styleUrls: ['./loginrestaurant.component.css']
})
export class LoginrestaurantComponent implements OnInit {

  loginForm!: FormGroup;
  model!: IUsers;
  title!: string;
  information!: string;
  responseData: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private userService: UserService
    ) { 
      localStorage.clear();
    }

  ngOnInit(): void {
    this.title = "Se connecter en tant que restaurant."
    this.information = "Cliquer le bouton 'Se connecter' si vous n'êtes pas un Restaurant."
    this.createForm();
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

    
    
    this.userService.loginRestaurant(this.model)
    .subscribe({
      next: ( data:any ) => {
        this.responseData = data;
        // console.log("TOKKKKENNN", this.responseData.token.split(' ')[1]); 
        localStorage.setItem('token',this.responseData.token.split(' ')[1]);
        this.route.navigate(['']);
      },
      error: (e) => {
        console.error("EREURRR",e);
      }
    })
  }

}
