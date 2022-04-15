import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

declare var window: any;

@Component({
  selector: 'app-headerloggedin',
  templateUrl: './headerloggedin.component.html',
  styleUrls: ['./headerloggedin.component.css']
})
export class HeaderloggedinComponent implements OnInit {
  registerModal: any;

  displayDashboardRestaurant: any;
  displayDashboardClient: any;
  displayDashboardDeliverer: any;
  displayDashboardEkaly: any;

  displayPlat: any;
  displayRestaurant: any;
  displayCommande: any;
  displayLivraison: any;
  dispalyPrivilege: any;
  curentRole: any;
  displayUser: any;

  constructor(
    public userService: UserService ,
    private route: Router
  ) { }

  ngOnInit() {    
    this.registerModal = new window.bootstrap.Modal(
      document.getElementById("linksregistermodal")
    );
      
    this.userService.updateTheMenu.subscribe(res => {
      this.displayMenuCurrentUser();
    });    
    this.displayMenuCurrentUser();
        
  }
  
  // Modals Register :

  openRegisterModal(){
    this.registerModal.show();
  }

  hideRegisterModal(){
    this.registerModal.hide();
  }

  closeRegisterModal(){
    this.registerModal.hide();
    this.route.navigate(['']);
  }

  // Afficher le menu en fonction des utilisateur connecté.
  displayMenuCurrentUser(){

    if (localStorage.getItem('token') != null) {
      this.curentRole = this.userService.getRoleByToken(this.userService.getToken());
      
      // Ekaly seulement
      this.displayUser = this.curentRole == 'ekaly';
      this.displayPlat = this.curentRole == 'ekaly';
      this.displayRestaurant = (this.curentRole == 'ekaly');
      this.displayLivraison = (this.curentRole == 'ekaly');
      this.displayCommande = (this.curentRole == 'ekaly' || this.curentRole == 'deliverer');
  
      // Tableau de bord.
      this.displayDashboardRestaurant = this.curentRole == 'restaurant';
      this.displayDashboardClient = this.curentRole == 'client';
      this.displayDashboardDeliverer = this.curentRole == 'deliverer';
    }
  }

  /**
   * Est-ce-que un utilisateur est connecté.
   * @returns 
   */
  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  // Nom d'utilisateur connecté.
  nameUser():any{
    return this.userService.nameOfUserConnected();
  }

  // Se deconnecter.
  logout(){
    this.userService.logout();
  }
}