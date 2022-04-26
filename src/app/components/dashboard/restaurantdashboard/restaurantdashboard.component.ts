import { Component, OnInit } from '@angular/core';
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
  profit: any;

  constructor(
    private platService: PlatService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.title = 'Tableau de board';
    this.getListePlats();
  }

  /**
   * Liste des palts:
   * - Obtenir le nombre par l'id de restaurant connecté, ...
   */
     getListePlats(){
      let id = this.userService.idOfUserConnected();
      return this.platService.getAll().subscribe( res => {
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
    }

}
