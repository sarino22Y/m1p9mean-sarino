import { Component, OnInit } from '@angular/core';
import { LivraisonService } from 'src/app/services/livraison.service';
import { PlatService } from 'src/app/services/plat.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-livraisoninfo',
  templateUrl: './livraisoninfo.component.html',
  styleUrls: ['./livraisoninfo.component.css']
})
export class LivraisoninfoComponent implements OnInit {
  livraisons: any;
  ekalyRole: boolean = true;

  constructor(
    private livraisonService:LivraisonService,
    private userService: UserService,
    private platService: PlatService
    ) { }

  async ngOnInit() {
    await this.getListeLivraison();
    this.isCurrentRoleEkaly();
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
   * Liste des livraisons.
   */
  async getListeLivraison()
  {
    await this.livraisonService.getAllinfo().subscribe( res => {
      this.livraisons = res['livraisons'];
      console.log(this.livraisons);
    });
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
}
