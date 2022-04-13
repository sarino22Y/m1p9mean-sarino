import { Component, OnInit } from '@angular/core';

import { RestaurantService } from 'src/app/services/restaurant.service'

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  restaurants: any;

  constructor(private restaurantService:RestaurantService) { }

  async ngOnInit() {
    await this.getListeRestaurant();
  }

  /**
   * Liste des Restaurants.
   */
  async getListeRestaurant()
  {
    await this.restaurantService.getAll().subscribe( res => {
      this.restaurants = res['restaurants'];
      console.log('ITYYYYYYYYYYYYYYYY',this.restaurants);
    });
  }
}
