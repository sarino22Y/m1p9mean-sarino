import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/services/commande.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-clientdashboard',
  templateUrl: './clientdashboard.component.html',
  styleUrls: ['./clientdashboard.component.css']
})
export class ClientdashboardComponent implements OnInit {

  title!: string;
  commandes!: any;
  commandesCurrentUser: any;
  nameCurrentClient: any;

  constructor(
    private commandeService: CommandeService,
    private userService: UserService
    ) {  
      
    }

  async ngOnInit() {
    this.title = 'Tableau de board';
    await this.getListeCommande();        
    this.infoUser();
  }

  // Id d'utilisateur connecté.
  idUser():any{
    return this.userService.idOfUserConnected();
  }

  /**
   * Information sur l'utilisateur conecté.
   * @returns 
   */
  infoUser() {
    console.log('IDDusereser',this.idUser());
    
    return this.userService.getUserById(this.idUser()).subscribe( res => {
      this.nameCurrentClient =  res[0].name;
      console.log('RESSS', this.nameCurrentClient);
    })
  }

  /**
   * Liste des commandes de client connecté.
   */
   async getListeCommande()
   {
     await this.commandeService.getAll().subscribe( res => {
       this.commandes = res['commandes'];    
     });
   }

   /**
    * La liste de commande de l'utilisateur connecté.
    */
   async getListeCommandeCurrentUser() {
     return await console.log("Tous le commandes ",this.commandes);
   }

}
