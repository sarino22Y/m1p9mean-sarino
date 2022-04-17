import { Component, OnInit } from '@angular/core';
import { PlatService } from 'src/app/services/plat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ekalydashboard',
  templateUrl: './ekalydashboard.component.html',
  styleUrls: ['./ekalydashboard.component.css']
})
export class EkalydashboardComponent implements OnInit {
  nbrPlats: any;
  nbrClient: any;
  nbrRestaurant: any;
  nbrDeliverer: any;


  constructor(
    private userService: UserService,
    private platService: PlatService
  ) { }

  ngOnInit(): void {
    this.getListePlat();
    this.getListeUser();
  }

  /**
   * Liste des plats.
   */
  getListePlat() {
    return this.platService.getAll().subscribe( res => {
      // console.log("VOICI RES ------",(res["plats"]).length);
      this.nbrPlats = (res["plats"]).length
    })
  }

  /**
   * Liste des utilisateurs:
   * - detection de nombre par profil d'utilisateur, ...
   */
  getListeUser(){
    return this.userService.getAll().subscribe( res => {
      let arrayClient = [];
      let arrayRestaurant = [];
      let arrayDeliverer = [];
      for (let i = 0; i < res["users"].length; i++) {
        if (res["users"][i].role == "client") {
          arrayClient.push(i);
        }   
        if (res["users"][i].role == "deliverer") {
          arrayDeliverer.push(i);
        }
        if (res["users"][i].role == "restaurant") {
          arrayRestaurant.push(i);
        }   
      }

      this.nbrClient = arrayClient.length;
      this.nbrDeliverer = arrayDeliverer.length;
      this.nbrRestaurant = arrayRestaurant.length;

    })
  }

}
