import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientdashboard',
  templateUrl: './clientdashboard.component.html',
  styleUrls: ['./clientdashboard.component.css']
})
export class ClientdashboardComponent implements OnInit {

  title!: string;
  Commandes!: any;

  constructor(
    ) { }

  ngOnInit(): void {
    this.title = 'Tableau de board';
  }
}
