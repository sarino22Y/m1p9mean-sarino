import { Component, OnInit } from '@angular/core';
import { PlatService } from 'src/app/services/plat-service.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  plats: any;

  constructor(private platListeService:PlatService) { }

  async ngOnInit() {
    await this.getListePlat();
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
