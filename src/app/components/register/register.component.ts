import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsers } from 'src/app/models/iusers';
import { UserService } from 'src/app/services/user.service';
import { matchingPasswordsValidator } from 'src/app/shared/validators/password-match';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  model!: IUsers;
  title!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router, 
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.title = 'Créer un compte';
    this.createForm()
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      adress: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {validators: matchingPasswordsValidator})
  }

  get f(){
    return this.registerForm.controls;
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
    
    console.log(this.registerForm.value);

    this.model = this.registerForm.value;
    this.userService.register(this.model)
    .subscribe({
      next: ( data ) => {
        console.log(data); 
        this.route.navigate(['user/login']);
      },
      error: (e) => {
        console.error(e);
      }
    })
    // console.log(JSON.stringify(this.registerForm.value));
  }
}
