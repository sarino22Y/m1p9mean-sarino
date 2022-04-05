import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    adress: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  /**
   * Aller dans la page login.
   */
  moveToLogin(){
    this.route.navigate(['user/login']);
  }

  /**
   * Méthode appellée par le boutton s'inscrire.
   * @returns 
   */
  register(){
    if (!this.registerForm.valid || this.registerForm.controls['password'].value != this.registerForm.controls['confirmPassword'].value) {
      if (!this.registerForm.controls['email'].valid) {
        console.log('Email invalide');
        return;
      }
      
      console.log('Forme invalide');
      return;
    }
    if (!this.registerForm.controls['email'].valid) {
      console.log('Email invalide');
      return;
    }
    console.log(JSON.stringify(this.registerForm.value));
    
  }
}
