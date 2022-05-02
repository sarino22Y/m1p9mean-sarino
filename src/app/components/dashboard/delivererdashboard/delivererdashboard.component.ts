import { Component, OnInit } from '@angular/core';
import { LivraisonService } from 'src/app/services/livraison.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delivererdashboard',
  templateUrl: './delivererdashboard.component.html',
  styleUrls: ['./delivererdashboard.component.css']
})
export class DelivererdashboardComponent implements OnInit {

  title!: string;
  Livraisons!: any;
  nbrDoing: any;
  nbrDone: any;

  constructor(
    private deliveryService: LivraisonService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.title = 'Tableau de board';
    this.getListeDelivery();
  }

  // Id d'utilisateur connecté.
  idUser():any{
    return this.userService.idOfUserConnected();
  }

  /**
   * Liste des utilisateurs:
   * - detection de nombre par profil d'utilisateur, ...
   */
  getListeDelivery(){
    return this.deliveryService.getAllinfo().subscribe( res => {
      let arrayDoing = [];
      let arrayDone = [];
      for (let i = 0; i < res["livraisoninfos"].length; i++) {
        if (res["livraisoninfos"][i].status == "doing" && res["livraisoninfos"][i].idDeliverer == this.idUser()) {
          arrayDoing.push(i);
        }   
        if (res["livraisoninfos"][i].status == "done" && res["livraisoninfos"][i].idDeliverer == this.idUser()) {
          arrayDone.push(i);
        }
      }

      this.nbrDoing = arrayDoing.length;
      this.nbrDone = arrayDone.length;

    })
  }
}
