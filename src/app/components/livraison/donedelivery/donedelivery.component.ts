import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDelivery } from 'src/app/models/idelivery';
import { LivraisonService } from 'src/app/services/livraison.service';
import { PlatService } from 'src/app/services/plat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-donedelivery',
  templateUrl: './donedelivery.component.html',
  styleUrls: ['./donedelivery.component.css']
})
export class DonedeliveryComponent implements OnInit {

  livraisons: any;
  plats: any;
  ekalyRole: boolean = true;
  modelLivraison!: IDelivery;
  idLivraison: any;
  idLivraisonInfo: any;
  idDeliverer: any;
  deliverers: any;

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
    this.idUser();
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
    if (this.ekalyRole && status == 'done') {
      return true;
    }
    if (id == this.idUser() && status == 'done') {
      return true
    } else {
      return false
    }
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
    });
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
  async delete(idDeliveryInfo: any, idDelivery: any) {
    let name: string;
    this.livraisonService.getOne(idDelivery).subscribe( res => {

    if (confirm("Supprimmer la livraison")) {     
      // alert("Pas disponible pour l'instant, réessayer plus tars.")  
      this.livraisonService.deleteInfo(idDeliveryInfo).subscribe({
        next: ( data ) => {
          window.location.href= "/livraisons/done";
          console.log("DATA-----",data);
          this.livraisonService.delete(idDelivery).subscribe()
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
