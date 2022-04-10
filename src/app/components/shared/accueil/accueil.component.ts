import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatService } from 'src/app/services/plat-service.service';
import { UserService } from 'src/app/services/user.service';

declare var window: any;
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  title: any;
  information: any

  plats: any;
  commandeModal: any;
 
  displayCommande: any;
  curentRole: any;

  constructor(
    private platListeService: PlatService,
    private userService: UserService,
    private route: Router
    ) { }

  async ngOnInit() {

    this.title = "Plats diponibles"
    this.information = "Etes-vous un client ? Connectez pour faire la commande."

    this.commandeModal = new window.bootstrap.Modal(
      document.getElementById("commandemodal")
    );
    await this.getListePlat();

    this.userService.updateTheMenu.subscribe(res => {
      this.displayButtonCommandForClientAndVisitor();       
    });    
    this.displayButtonCommandForClientAndVisitor();
  }

  // Modals Commande :

  openCommandeModal(){
    this.commandeModal.show();
  }

  closeCommandeModal(){
    this.commandeModal.hide();
    this.route.navigate(['']);
  }

  async commander(){
    return "this.";
  }

  /**
   * Afficher le bouton commande sur l'accueil si 
   * l'utilisateur connecté est un client.
   */
  displayButtonCommandForClientAndVisitor(){
    if (this.userService.getToken() != '') {
      this.curentRole = this.userService.getRoleByToken(this.userService.getToken());
      // Client seulement
      this.displayCommande = this.curentRole == 'client';
    }
  }

  /**
   * Liste des plats.
   */
  async getListePlat()
  {
    await this.platListeService.getAll().subscribe( res => {
      this.plats = res['plats'];
    });
  }
}
