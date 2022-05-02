import { Component, OnInit } from '@angular/core';
import { LivraisonService } from 'src/app/services/livraison.service';
import { PlatService } from 'src/app/services/plat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-plat-sold',
  templateUrl: './plat-sold.component.html',
  styleUrls: ['./plat-sold.component.css']
})
export class PlatSoldComponent implements OnInit {

  plats: any = [];
  ekalyRole: boolean = true;
  idCurrentUser: any;

  constructor(
    private platService: PlatService,
    private livraisonService: LivraisonService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getListePlatSold();
    this.isCurrentRoleEkaly();
    this.getIdCurrentUser();
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
   * Liste des plats vendus.
   */
  getListePlatSold(){
    let platsSold: any = [];
    let result: any = [];
    this.livraisonService.getAll().subscribe(res => {
      this.platService.getAll().subscribe(resplats => {
        for (let i = 0; i < resplats.plats.length; i++) {
          for (let j = 0; j < res.livraisons.length; j++) {
            if (res.livraisons[j].idPlat == resplats.plats[i]._id) {
              platsSold[j] = resplats.plats[i];
              platsSold[j].dateLivraison = res.livraisons[j].dateLivraison;
            }     
          }
        }       
        for (let k = 0; k < platsSold.length; k++) {
          const element = platsSold[k];
          if (element) {           
            this.plats.push(element);
          }
        }
        console.log("Les plats vendus ", this.plats);
      })
    });
  }

   /**
    * Supprimer un plat.
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
