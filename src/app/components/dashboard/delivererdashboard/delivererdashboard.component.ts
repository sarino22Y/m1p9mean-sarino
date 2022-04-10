import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivererdashboard',
  templateUrl: './delivererdashboard.component.html',
  styleUrls: ['./delivererdashboard.component.css']
})
export class DelivererdashboardComponent implements OnInit {

  title!: string;
  Livraisons!: any;

  constructor(
    ) { }

  ngOnInit(): void {
    this.title = 'Tableau de board';
  }
}
