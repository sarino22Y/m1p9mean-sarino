import { Component, OnInit } from '@angular/core';
import { LivraisonService } from 'src/app/services/livraison.service';
import { PlatService } from 'src/app/services/plat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-restaurantdashboard',
  templateUrl: './restaurantdashboard.component.html',
  styleUrls: ['./restaurantdashboard.component.css']
})
export class RestaurantdashboardComponent implements OnInit {

  title!: string;
  Plats!: any;
  nbrplats: any;
  nbrplatsSold: any;
  profit: any;
  totalProfit: any;

  constructor(
    private platService: PlatService,
    private livraisonService: LivraisonService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.title = 'Tableau de board';
    this.getListePlats();
    this.getPlatSold();
  }

  /**
   * Liste des palts:
   * - Obtenir le nombre par l'id de restaurant connecté, ...
   */
     getListePlats(){
      let id = this.userService.idOfUserConnected();
      this.platService.getAll().subscribe( res => {
        let arrayPlatRestaurantConnected = [];
        let profitTotal = [];
        for (let i = 0; i < res["plats"].length; i++) {
          if (res["plats"][i].idRestaurant == id) {
            arrayPlatRestaurantConnected.push(i);
            profitTotal.push(res["plats"][i].price)           
          } 
        }
        this.profit =  profitTotal.reduce((partialSum, a) => parseInt(partialSum) + parseInt(a), 0);
        this.nbrplats = arrayPlatRestaurantConnected.length;
      })

      let platsSold: any = [];
      let resultSoldPerRestaurant: any = [];
      this.livraisonService.getAll().subscribe(resLivraison => {
        this.platService.getAll().subscribe(resplats => {
          for (let i = 0; i < resplats.plats.length; i++) {
            for (let j = 0; j < resLivraison.livraisons.length; j++) {
              if (resLivraison.livraisons[j].idPlat == resplats.plats[i]._id) {
                platsSold[j] = resplats.plats[i];
              }     
            }
          }
          for (let k = 0; k < platsSold.length; k++) {           
            if (platsSold[k].idRestaurant == id) {
              resultSoldPerRestaurant.push(platsSold[k])
            }
          }
          console.log("Plat resultSoldPerRestaurant ty", resultSoldPerRestaurant);
          console.log("platsSold ty", platsSold);
          
          // this.nbrplatsSold = resultSoldPerRestaurant.length;
        })
      });
    }
  
   /**
   * Liste des plats vendus.
   */
  getPlatSold() {
    this.platService.getPlatLivraisons().subscribe(res => {
      let plats = res['platlivraisons'];      
        this.platService.getAll().subscribe(resPlats => {
          this.livraisonService.getAll().subscribe(resLivraison => {
            var platlivraisonsMap: any = [];
            var livraisonsMap: any = [];

            let resultPlat = resPlats['plats'];
            resultPlat.forEach((plat: any) => {
              platlivraisonsMap[plat._id] = plat;
            });

            let resultLivraison = resLivraison['livraisons'];
            resultLivraison.forEach((livraison: any) => {
              livraisonsMap[livraison._id] = livraison;
            });            
            
            let platLivraison = plats.map((platLivraison: any) => {
              return {
                platLivraison: platLivraison,
                plat: platlivraisonsMap[platLivraison.idPlat],
                livraison: livraisonsMap[platLivraison.idDelivery]
              };
            });

            
            let arrProfit: any = [];
            let arrNumberSold: any = [];
            for (let i = 0; i < platLivraison.length; i++) {
              if ( platLivraison[i].plat.idRestaurant == this.userService.idOfUserConnected()) {
                arrProfit.push(platLivraison[i].plat.profit * platLivraison[i].livraison.number);
                arrNumberSold.push(platLivraison[i].livraison.number);
              }
              
            }
            
            this.totalProfit = arrProfit.reduce((a:any, b:any) => a + b, 0);
            this.nbrplatsSold =  arrNumberSold.reduce((a:any, b:any) => a + b, 0);
        });
      });
    }); 
  }

}
