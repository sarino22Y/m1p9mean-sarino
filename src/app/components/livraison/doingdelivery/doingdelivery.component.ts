import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDeliveryInfo } from 'src/app/models/ideliveryinfo';
import { LivraisonService } from 'src/app/services/livraison.service';
import { PlatService } from 'src/app/services/plat.service';
import { UserService } from 'src/app/services/user.service';

declare var window: any;

@Component({
  selector: 'app-doingdelivery',
  templateUrl: './doingdelivery.component.html',
  styleUrls: ['./doingdelivery.component.css']
})
export class DoingdeliveryComponent implements OnInit {

  idLivraisonInfo: any;
  idLivraison: any;
  idDeliverer: any;
  idPlat: any;
  dateSoldPlat: any;
  profitPlat: number = 0;
  livraisons: any;
  plats: any;
  status: any;
  deliverers: any;
  modelLivraisonInfo!: IDeliveryInfo;
  ekalyRole: boolean = true;
  delivererRole: boolean = true;
  updateModal: any;
  updateForm!: FormGroup;

  constructor(
    private livraisonService:LivraisonService,
    private userService: UserService,
    private platService: PlatService,
    private formBuilder: FormBuilder
    ) {
     }

  async ngOnInit() {
    await this.getListeLivraison();
    this.getListeDeliverer();
    this.isCurrentRoleEkaly();
    this.isCurrentRoleDeliverer()
    this.updateModal = new window.bootstrap.Modal(
      document.getElementById("updatemodal")
    );
    this.livraisonService.updateTheLivraison.subscribe(res => {
      this.editForm();       
    });  
    this. editForm();
    this.idUser();
    
    console.log("ID USER CONNECTED", this.idUser());
    this.statusLivraisonByDeliverer();
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
      status: new FormControl('', [Validators.required])
    });
  }

  /**
   * Est-ce que le role en cour est 'ekaly'.
   */
   isCurrentRoleEkaly(): boolean {
    let role = this.userService.roleOfUserConnected();
    if (role != "ekaly" ) {
      return this.ekalyRole = false;
    }
    return this.ekalyRole;
  }

  /**
   * Est-ce que le role en cour est 'livreur'.
   */
   isCurrentRoleDeliverer(): boolean {
    let role = this.userService.roleOfUserConnected();
    if (role != "deliverer" ) {
      return this.delivererRole = false;
    }
    return this.delivererRole;
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

  /**
   * Statu pour la liste deroulante pendant
   * la mise à jour de livraison par son livreur.
   * @returns 
   */
  statusLivraisonByDeliverer() {
    let stat:any;
    stat = {status:[{name: "done", nameFr: "Fait"}]};
    this.status = stat['status'];
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
    if (this.ekalyRole && status == 'doing') {
      return true;
    }
    if (id == this.idUser() && status == 'doing') {
      return true
    } else {
      return false
    }
  }

  /**
   * Filtrer les livreurs dans la liste des utilisateur.
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
    });
  }

  /**
   * Obtenir l'information de livraison
   */
  getById(livraison: any) {
     console.log(livraison);
     
    this.idLivraisonInfo = livraison._id;
    this.idLivraison = livraison.idLivraison;
    this.dateSoldPlat = livraison.dateLivraison;

    console.log("ID LIVRAISON", this.idLivraison);
    
    
    this.getLivraisonById();
  }

  getLivraisonById() {
    this.livraisonService.getOne(this.idLivraison).subscribe( res => {
      this.idPlat = res[0].idPlat;
      console.log("RESULTAT ID PLAT", this.idPlat);

      // TODO: profit = soldPrice - expense (Dépense)
      this.platService.getPlatById(this.idPlat).subscribe( resPlat =>{
        this.profitPlat = parseInt(resPlat[0].price)
      });
    });
  }

  updateLivraison(){
    this.modelLivraisonInfo = this.updateForm.value;

    let dataPlatLivraison = {
      idPlat: this.idPlat,
      idDelivery: this.idLivraison,
      profit: this.profitPlat,
      dateSold: this.dateSoldPlat
    };
    console.log("Ass plat livraison", dataPlatLivraison);
    
    if(confirm("La livraison est terminée." )) {
      this.livraisonService.updateInfo(this.idLivraisonInfo, this.modelLivraisonInfo)
      .subscribe({
        next: ( data ) => {
          alert("Mise à jour avec succès.");
          console.log("DATA livraisons done-----",data);
          this.livraisonService.update(this.idLivraison, this.modelLivraisonInfo)
          .subscribe({
            next: (data2) => {
              console.log("Succés", data2);
              this.platService.createPlatDelivery(dataPlatLivraison).subscribe({
                next: ( dataplatDelivery ) => {
                  console.log("Création avec succès de l'association Plat/Livraison", dataplatDelivery);
                  window.location.href= "livraisons/done";
                },
                error: (errorPlatDelivery)  => { 
                   console.error(errorPlatDelivery);                   
                }
              });
            },
            error: (error) => {
              console.error(error);
            }
          })
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
      alert("Pas disponible pour l'instant, réessayer plus tars.");
      // this.livraisonService.delete(idDelivery).subscribe({
      //   next: ( data ) => {
      //     window.location.href= "/livraisons";
      //     console.log("DATA-----",data);
      //   },
      //   error: (e) => {
      //     alert("Une erreur s'est produite. Veuillez réessayer plus tard.")
      //     console.error(e);
      //   }
      // })
    }
  }); 
  }

}
