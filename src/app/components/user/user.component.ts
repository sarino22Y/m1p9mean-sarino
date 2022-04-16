import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsers } from 'src/app/models/iusers';
import { UserService } from 'src/app/services/user.service';
import { matchingPasswordsValidator } from 'src/app/shared/validators/password-match';

declare var window: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any;
  idUser: any;
  username: any;
  route: any;
  result: any;
  registerForm!: FormGroup;
  registerModal: any;
  model!: IUsers;

  constructor(
    private userService:UserService,
    public router: Router,    
    private formBuilder: FormBuilder
    ) { 
      this.route = this.router.url
    }

  async ngOnInit() {
    let resultRoute = this.route.split("/");
    this.result = resultRoute[2].toString();

    await this.getListeUser();

    
    this.registerModal = new window.bootstrap.Modal(
      document.getElementById("registermodal")
    );

    this.userService.updateTheMenu.subscribe(res => {
      this.createForm();       
    });    
    this.createForm();
  }

  /**
   * Form de register.
   */
   createForm() {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      adress: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    },{validators: matchingPasswordsValidator});
  }

  /**
   * Ouvrir le modal de register.
   */
  openRegisterModal(){
    this.registerModal.show();
  }

  /**
   * Fermer le modal de register.
   */
  closeRegisterModal(){
    this.registerModal.hide();
    this.route.navigate(['']);
  }

  /**
   * Est-ce-que le role dans la liste correspond au rôle dans l'url?
   * Si oui, retourner TRUE.
   * @param role
   * @returns 
   */
  IsRoleIncludeInUser(role: any): boolean{
    if (role == this.result) {
      return true;
    }else {
      return false;
    }
    
  }

  /**
   * Liste des users.
   */
  async getListeUser()
  {
    await this.userService.getAll().subscribe( res => {
      this.users = res['users'];
      console.log('ITY',this.users[0].role);
    });
  }

  /**
   * Ajouter un utilisateur.
   */
   register() {
    this.model = this.registerForm.value;

    this.model["role"] = this.result;
    // console.log(this.model);
    if(confirm("Création de nouveau utilisateur de profile " + this.result)) {
      this.userService.registerByAdmin(this.model)
      .subscribe({
        next: ( data ) => {
          window.location.href= "users/" + this.result;
          console.log("DATA-----",data);
        },
        error: (e) => {
          alert("Une erreur s'est produite. Veuillez réessayer plus tard.")
          console.error(e);
        }
      })
    }
   }

   /**
    * Supprimer un utilisateur.
    */
   async delete(idUser:any) {    
    let name: string;
    this.userService.getUserById( idUser ).subscribe( res => {
      name = res[0].username;
      if (confirm("Supprimer : " + name)) {
        this.userService.delete(idUser)
           .subscribe({ 
             next: ( data ) => {
             window.location.href= "users/" + this.result;
             console.log("DATA-----",data);
           },
           error: (e) => {
             alert("Une erreur s'est produite. Veuillez réessayer plus tard.")
             console.error(e);
           }
         })
       }
     });    
  }
}
