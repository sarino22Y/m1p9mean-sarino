import { Component, OnInit } from '@angular/core';
import { LivraisonService } from 'src/app/services/livraison.service';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.css']
})
export class LivraisonComponent implements OnInit {
  livraisons: any;

  constructor(private livraisonService:LivraisonService) { }

  async ngOnInit() {
    await this.getListeLivraison();
  }

  /**
   * Liste des livraisons.
   */
  async getListeLivraison()
  {
    await this.livraisonService.getAll().subscribe( res => {
      this.livraisons = res['livraisons'];
      console.log('ITYYYYYYYYYYYYYYYY',this.livraisons);
    });
  }
}
