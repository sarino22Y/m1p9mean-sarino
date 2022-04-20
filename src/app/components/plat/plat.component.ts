import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IPlats } from 'src/app/models/iplats';
import { PlatService } from 'src/app/services/plat.service';
import { UserService } from 'src/app/services/user.service';


declare var window: any;
@Component({
  selector: 'app-plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.css']
})
export class PlatComponent implements OnInit {
  plats: any;
  registerModal: any;
  registerForm!: FormGroup;
  model!: IPlats;
  idCurrentUser: any;
  ekalyRole: boolean = true;

  constructor(
    private platService:PlatService,
    private userService: UserService,
    private formBuilder: FormBuilder
    ) { }

  async ngOnInit() {
    await this.getListePlat();

    await this.platService.updateThePlats.subscribe( res => {
      this.createForm();
    });

    await this.createForm();
    this.registerModal = new window.bootstrap.Modal(
      document.getElementById("registermodal")
    );

    await this.getIdCurrentUser();

    await this.isCurrentRoleEkaly();
  }

  /**
   * Id de l'utilisateur connecté.
   */
  getIdCurrentUser() {
    this.idCurrentUser =  this.userService.idOfUserConnected();
    return this.idCurrentUser;
  }

  /**
   * Est-ce que le role en cour est 'ekaly'
   */
  isCurrentRoleEkaly(): boolean {
    let role = this.userService.roleOfUserConnected();
    if (role != "ekaly" ) {
      return this.ekalyRole = false;
    }
    return this.ekalyRole;
  }

  /**
   * Form de register.
   */
   createForm() {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    });
  }

  /**
   * Ouvrir le modal d'insertion de plat.
   */
   openRegisterModal(){
    this.registerModal.show();
  }

  /**
   * Fermer le modal d'insertion de plat'.
   */
  closeRegisterModal(){
    this.registerModal.hide();
  }

  /**
   * Liste des plats.
   */
  async getListePlat() {
    await this.platService.getAll().subscribe( res => {
      this.plats = res['plats'];
      console.log('ITYYYYYYYYYYYYYYYY',this.plats);
    });
  }

   /**
   * Ajouter un plat.
   */
  register() {
    this.model = this.registerForm.value;

    this.model["idRestaurant"] = this.userService.idOfUserConnected();
    // console.log(this.model);
    if(confirm("Création de nouveau plat : " + this.model["name"])) {
      this.platService.create(this.model)
      .subscribe({
        next: ( data ) => {
          window.location.href= "platliste";
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
  async delete(idPlat:any) {    
    let name: string;
    this.platService.getPlatById( idPlat ).subscribe( res => {
      name = res[0].name;
      console.log("RESULTAT", res);
      
      if (confirm("Supprimer : " + name)) {
        this.platService.delete(idPlat)
           .subscribe({ 
              next: ( data ) => {
              window.location.href= "/platliste";
              console.log("DATA-----",data);
           },
           error: (e) => {
              alert("Une erreur s'est produite. Veuillez réessayer plus tard.")
              console.error(e);
           }
         })
        alert("OK, mais pas effectué pour l'instant")
       }
     });    
  }

}
