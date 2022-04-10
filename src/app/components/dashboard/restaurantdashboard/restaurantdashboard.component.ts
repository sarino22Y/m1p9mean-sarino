import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurantdashboard',
  templateUrl: './restaurantdashboard.component.html',
  styleUrls: ['./restaurantdashboard.component.css']
})
export class RestaurantdashboardComponent implements OnInit {

  title!: string;
  Plats!: any;

  constructor(
    ) { }

  ngOnInit(): void {
    this.title = 'Tableau de board';
  }
}
