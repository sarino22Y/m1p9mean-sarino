import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  commandes: any;

  constructor(private commandeService:CommandeService) { }

  async ngOnInit() {
    await this.getListeCommande();
  }

  /**
   * Liste des commandes.
   */
  async getListeCommande()
  {
    await this.commandeService.getAll().subscribe( res => {
      this.commandes = res['commandes'];
      console.log('ITYYYYYYYYYYYYYYYY',this.commandes);
    });
  }
}
