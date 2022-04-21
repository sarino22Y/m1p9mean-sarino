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
  updateForm!: FormGroup;
  updateModal: any;
  model!: IPlats;
  namePlatById: any;
  idPlatById: any;
  idCurrentUser: any;
  ekalyRole: boolean = true;

  constructor(
    private platService:PlatService,
    private userService: UserService,
    private formBuilder: FormBuilder
    ) { }

  async ngOnInit() {
    await this.getListePlat();
    
    this.updateModal = new window.bootstrap.Modal(
      document.getElementById("updatemodal")
    );

    this.registerModal = new window.bootstrap.Modal(
      document.getElementById("registermodal")
    );

    this.platService.updateThePlats.subscribe( res => {
      this.createForm();
    });
    this.createForm();

    this.platService.updateThePlats.subscribe(res => {
      this.editForm();       
    });    
    this.editForm();

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
   * Form de update.
   */
   editForm() {
    this.updateForm = this.formBuilder.group({
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
   * Liste des plats.
   */
  async getListePlat() {
    await this.platService.getAll().subscribe( res => {
      this.plats = res['plats'];
      console.log('ITYYYYYYYYYYYYYYYY',this.plats);
    });
  }

  /**
   * Obtenir l'utilisateur par son Id.
   * @param id 
   * @returns 
   */
  getById(id: any) {
    return this.platService.getPlatById(new Object(id)).subscribe( res => {
      this.updateForm = this.formBuilder.group({
        name: this.formBuilder.control(res[0].name),
        number: this.formBuilder.control(res[0].number),
        price: this.formBuilder.control(res[0].price)
        });

      this.idPlatById = res[0]._id;
      this.namePlatById = res[0].name;
    })
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
   * Méthode appellée par le boutton modifier.
   * Action de form de mise à jour.
   * @returns 
   */
  update(){
    this.model = this.updateForm.value;
    console.log("MODEL", this.model);
    
    if(confirm("Mettre à jour : " + this.namePlatById)) {
      this.platService.update(this.idPlatById, this.model)
      .subscribe({
        next: ( data ) => {
          window.location.href= "platliste";
          console.log("DATA-----",data);
        },
        error: (e) => {
          console.error(e);
        }
      })
      console.log(JSON.stringify(this.updateForm.value));
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
