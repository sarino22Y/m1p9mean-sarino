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
  updateForm!: FormGroup;
  updateModal: any;

  curentRole: any;
  dspButtonToCurrentUser: any;

  idById: any;
  nameById: any;
  usernameById: any;
  emailById: any;
  adressById: any
  passwordById: any;

  constructor(
    private userService:UserService,
    public router: Router,    
    private formBuilder: FormBuilder
    ) { 
      this.route = this.router.url
    }

  async ngOnInit() {
    this.userService.spinner();
    let resultRoute = this.route.split("/");
    this.result = (resultRoute[2].toString() ? resultRoute[2].toString() : null);

    await this.getListeUser();

    this.registerModal = new window.bootstrap.Modal(
      document.getElementById("registermodal")
    );
    this.updateModal = new window.bootstrap.Modal(
      document.getElementById("updatemodal")
    );

    this.userService.updateTheMenu.subscribe(res => {
      this.createForm();       
    });    
    this.createForm();

    this.userService.updateTheMenu.subscribe(res => {
      this.editForm();       
    });    
    this.editForm();

    this.userService.updateTheMenu.subscribe(res => {
      this.displayButtonToCurrentUser();
    });    
    this.displayButtonToCurrentUser();

    this.isResultRouteNull();
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
   * Form de update.
   */
  editForm() {
    this.updateForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      adress: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
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
  }

  /**
   * Ouvrir le modal de update.
   */
  openUpdateModal(){
    this.updateModal.show();
  }

  /**
   * Fermer le modal de register.
   */
  closeUpdateModal(){
    this.updateModal.hide();
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
   * Si le resultat de route est null alors,
   * la liste de tous les utilisateur doit affichée.
   */
  isResultRouteNull(): any{
    if (this.result == "all") {
      console.log('result route est ---', this.result );
      return true;
    }
  }

  displayButtonToCurrentUser() {
    if (localStorage.getItem('token') != null) {
      this.curentRole = this.userService.getRoleByToken(this.userService.getToken());      
      // Ekaly seulement
      this.dspButtonToCurrentUser = this.curentRole == 'ekaly' && this.curentRole == this.result;

      console.log("DISPALY BUTTON ----------",this.dspButtonToCurrentUser);
      
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
   * Obtenir l'utilisateur par son Id.
   * @param id 
   * @returns 
   */
  getById(id: any) {
    return this.userService.getUserById(new Object(id)).subscribe( res => {
      this.updateForm = this.formBuilder.group({
        name: this.formBuilder.control(res[0].name),
        username: this.formBuilder.control(res[0].username),
        email: this.formBuilder.control(res[0].email),
        adress: this.formBuilder.control(res[0].adress),
        password: new FormControl('',  [Validators.required]),
        confirmPassword: new FormControl('',  [Validators.required])
      },{validators: matchingPasswordsValidator});

      this.idById = res[0]._id;
      this.usernameById = res[0].username;
    })
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
   * Méthode appellée par le boutton s'inscrire.
   * @returns 
   */
  update(){
    this.model = this.updateForm.value;
    if(confirm("Mettre à jour : " + this.usernameById)) {
      this.userService.edit(this.idById, this.model)
      .subscribe({
        next: ( data ) => {
          window.location.href= "users/" + this.result;
        },
        error: (e) => {
          console.error(e);
        }
      })
      // console.log(JSON.stringify(this.updateForm.value));
    }
  }

  /**
   * Supprimer un utilisateur.
   * @param idUser 
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