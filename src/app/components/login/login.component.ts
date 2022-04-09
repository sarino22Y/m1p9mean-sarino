import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private userService: UserService
    ) { 
      localStorage.clear();
    }

  ngOnInit(): void {
    this.title = "Se connecter."
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
      console.log("Form invalide");
      return;      
    }
    console.log(JSON.stringify(this.loginForm.value));
    this.userService.login(JSON.stringify(this.loginForm.value))
    .subscribe({
      next: ( data:any ) => {
        console.log("DATATATTT", data.status); 
        this.responseData = data;
        localStorage.setItem('token',this.responseData.jwtToken);

        if (data.status=='error') {
          alert("Nom d'utilisateur ou mots de passe incorrecte.")
          this.route.navigate(['/user/login'])
        } else {
          this.route.navigate(['/platliste']);
        }
        // data.status=='error' ? this.route.navigate(['/user/login']) : this.route.navigate(['/']);
      },
      error: (e) => {
        console.error("ERERERERERE",e);
      }
    })
  }
}