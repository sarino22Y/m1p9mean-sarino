import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDelivery } from 'src/app/models/idelivery';
import { IDeliveryInfo } from 'src/app/models/ideliveryinfo';
import { LivraisonService } from 'src/app/services/livraison.service';
import { PlatService } from 'src/app/services/plat.service';
import { UserService } from 'src/app/services/user.service';

declare var window: any;
@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.css']
})
export class LivraisonComponent implements OnInit {
  livraisons: any;
  plats: any;
  ekalyRole: boolean = true;
  modelLivraison!: IDelivery;
  modelLivraisonInfo!: IDeliveryInfo;
  updateModal: any;
  updateForm!: FormGroup;
  idLivraison: any;
  idLivraisonInfo: any;
  idDeliverer: any;
  deliverers: any;

  constructor(
    private livraisonService:LivraisonService,
    private userService: UserService,
    private platService: PlatService,
    private formBuilder: FormBuilder
    ) { }

  async ngOnInit() {
    await this.getListeLivraison();
    this.getListeDeliverer();
    this.isCurrentRoleEkaly();
    this.updateModal = new window.bootstrap.Modal(
      document.getElementById("updatemodal")
    );
    this.livraisonService.updateTheLivraison.subscribe(res => {
      this.editForm();       
    });  
    this. editForm();
    this.idUser();
    this.userService.spinner();
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
   * Form de update.
   */
   editForm() {
    this.updateForm = this.formBuilder.group({
      idLivraison: new FormControl(''),
      status: new FormControl(''),
      idDeliverer: new FormControl('', [Validators.required])
    });
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
   * Traduire en fraçais le status
   * @param status 
   * @returns 
   */
  changeStatusInFrench(status: string): any {
    if (status == "pending") {
      return "En entante";
    }

    if (status == "doing") {
      return "En cours";
    }

    if (status == "done") {
      return "Terminé";
    }
  }

  // Id d'utilisateur connecté.
  idUser():any{
    return this.userService.idOfUserConnected();
  }

  /**
   * Afficher la livraisons en fonction de livreur.
   * @param id 
   * @returns 
   */
  isEqualsIdDeliverer(id: any, status: any): boolean {
    if (id == this.idUser() || status == 'pending') {
      return true
    } else {
      return false
    }
  }


  /**
   * Obtenir l'id de livraison.
   * @param id 
   * @returns 
   */
   getById(idLivraison: any, idLivraisonInfo: any) {
     console.log( "ID LIVREUR EST", idLivraison);
     this.idLivraison = idLivraison;
     this.idLivraisonInfo = idLivraisonInfo;
    return this.livraisonService.getOne(new Object(idLivraison)).subscribe( res => {
      this.updateForm = this.formBuilder.group({
        idLivraison: this.formBuilder.control(res[0]._id),
        status: this.formBuilder.control("doing"),
        idDeliverer: this.formBuilder.control('', [Validators.required])
        });
    })
  }

  /**
   * La liste de livreur.
   * @returns 
   */
  getListeDeliverer(){
    this.userService.getAll().subscribe( res => {
      let objUser = [];
      let index = 0;
      for (let i = 0; i < res['users'].length; i++) {
        if (res['users'][i].role != 'deliverer') {
          continue;
        } else {
          objUser[index] = res['users'][i];
          index = index + 1;
        }        
      }
      this.deliverers = objUser;
      // console.log("LIVREURS ", this.deliverers);

      // console.log("USERS ", res['users']);    
      
    })
  }

  /**
   * Liste des livraisons.
   */
  async getListeLivraison()
  {
    await this.livraisonService.getAllinfo().subscribe( res => {
      this.livraisons = res['livraisoninfos'];
      console.log(this.livraisons);
    });
  }

  updateLivraison(){
    this.modelLivraisonInfo = this.updateForm.value;
    console.log("MODEL LIVRAISON", this.modelLivraisonInfo);
    console.log("MODEL ID LIVRAISON INFO", this.idLivraisonInfo);
    
    if(confirm("La livraison va être en cours et livrée" )) {
      this.livraisonService.updateInfo(this.idLivraisonInfo, this.modelLivraisonInfo)
      .subscribe({
        next: ( data ) => {
          window.location.href= "livraisons";
          console.log("DATA livraisons-----",data);
        },
        error: (e) => {
          console.error(e);
        }
      })
      console.log(JSON.stringify(this.updateForm.value));
    }
  }

  /**
   * Lite des palts
   */
  async getListePlat(id:any) {
    await this.platService.getPlatById(id).subscribe( res => {
      console.log("PLATS", res);
      
      return res
    })
  }

  async getNamePlatById(idPlat: any) {
    await this.livraisonService.getAll().subscribe( res => {
      idPlat = res['livraisons'][0].idPlat;
      console.log("ID PLAT", idPlat);
      this.platService.getPlatById(idPlat).subscribe(res => {
        if (res[0]._id == idPlat) {
          return res[0].name;
        }        
      });
    });
  }

  /**
   * Supprimmer une livaraison
   */
  async delete(idDelivery: any) {
    let name: string;
    this.livraisonService.getOne(idDelivery).subscribe( res => {

    if (confirm("Supprimmer la livraison")) {       
      this.livraisonService.delete(idDelivery).subscribe({
        next: ( data ) => {
          window.location.href= "/livraisons";
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
