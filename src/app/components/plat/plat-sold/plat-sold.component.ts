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
  resultPlat = [];
  resultLivraison = [];
  totalProfit: number = 0;
  platLivraison: any;
  ekalyRole: boolean = true;
  idCurrentUser: any;

  constructor(
    private platService: PlatService,
    private livraisonService: LivraisonService,
    private userService: UserService
  ) { }

  async ngOnInit() {
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
  getListePlatSold() {
    this.platService.getPlatLivraisons().subscribe(res => {
      this.plats = res['platlivraisons'];      
        this.platService.getAll().subscribe(resPlats => {
          this.livraisonService.getAll().subscribe(resLivraison => {
            var platlivraisonsMap: any = [];
            var livraisonsMap: any = [];

            this.resultPlat = resPlats['plats'];
            this.resultPlat.forEach((plat: any,i) => {
              platlivraisonsMap[plat._id] = plat;
            });

            this.resultLivraison = resLivraison['livraisons'];
            this.resultLivraison.forEach((livraison: any,i) => {
              livraisonsMap[livraison._id] = livraison;
            });            
            
            this.platLivraison = this.plats.map((platLivraison: any) => {
              return {
                platLivraison: platLivraison,
                plat: platlivraisonsMap[platLivraison.idPlat],
                livraison: livraisonsMap[platLivraison.idDelivery]
              };
            });

            
            let arrProfit: any = [];
            for (let i = 0; i < this.platLivraison.length; i++) {
              if ( this.platLivraison[i].plat.idRestaurant == this.getIdCurrentUser()) {
                arrProfit.push(this.platLivraison[i].plat.profit * this.platLivraison[i].livraison.number);
               }
              
            }
            this.totalProfit = arrProfit.reduce((a:any, b:any) => a + b, 0);
            console.log("plat livraison", arrProfit.reduce((a:any, b:any) => a + b, 0));
        });
      });
    }); 
  }
  
  /**
   * Liste des plats vendus.
   */
  // getListePlatSold(){
  //   let platsSold: any = [];
  //   let result: any = [];
  //   this.livraisonService.getAll().subscribe(res => {
  //     this.platService.getAll().subscribe(resplats => {
  //       for (let i = 0; i < resplats.plats.length; i++) {
  //         for (let j = 0; j < res.livraisons.length; j++) {
  //           if (res.livraisons[j].idPlat == resplats.plats[i]._id) {
  //             platsSold[j] = resplats.plats[i];
  //             platsSold[j].dateLivraison = res.livraisons[j].dateLivraison;
  //           }     
  //         }
  //       }       
  //       for (let k = 0; k < platsSold.length; k++) {
  //         const element = platsSold[k];
  //         if (element) {           
  //           this.plats.push(element);
  //         }
  //       }
  //       console.log("Les plats vendus ", this.plats);
  //     })
  //   });
  // }

   /**
    * Supprimer un plat.
    */
    async delete(idPlat:any) {
      let name: string;
        
        if (confirm("Supprimer")) {
          this.platService.deletePlatDelivery(idPlat)
             .subscribe({ 
                next: ( data ) => {
                  window.location.href= "/platliste/sold";
                  console.log("DATA-----",data);
             },
             error: (e) => {
                alert("Une erreur s'est produite. Veuillez réessayer plus tard.")
                console.error(e);
             }
           })
          alert("OK, mais pas effectué pour l'instant")
         } 
    }
}
