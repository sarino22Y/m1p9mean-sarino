import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

declare var window: any;

@Component({
  selector: 'app-headerloggedin',
  templateUrl: './headerloggedin.component.html',
  styleUrls: ['./headerloggedin.component.css']
})
export class HeaderloggedinComponent implements OnInit {

  name: any;
  loginModal: any;
  registerModal: any;

  displayMenu: any;
  displayRestaurant: any;
  displayCommande: any;
  displayLivraison: any;
  dispalyPrivilege: any;
  curentRole: any;
  displayUser: any;

  constructor(
    private userService: UserService ,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.loginModal = new window.bootstrap.Modal(
      document.getElementById("linksloginmodal")
    );
    
    this.registerModal = new window.bootstrap.Modal(
      document.getElementById("linksregistermodal")
    );

    this.userService.updateTheMenu.subscribe(res => {
      this.displayMenuCurrentUser();       
    });    
    this.displayMenuCurrentUser();
  }

  // Modals Login :

  openLoginModal(){
    this.loginModal.show();
  }

  hideLoginModal(){
    this.loginModal.hide();
  }

  closeLoginModal(){
    this.loginModal.hide();
    this.route.navigate(['']);
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
    if (this.userService.getToken() != '') {
      this.curentRole = this.userService.getRoleByToken(this.userService.getToken());
      this.displayUser = this.curentRole == 'ekaly';
      this.displayRestaurant = (this.curentRole == 'ekaly');
      this.displayCommande = (this.curentRole == 'ekaly' || this.curentRole == 'deliverer');
      this.displayLivraison = (this.curentRole == 'ekaly');
    }
  }

  // Nom d'utilisateur connecté.
  nameUser():any{
    return this.userService.nameOfUserConnected();
  }

  // Si un utilisateur est connecté.
  loggedIn(){
    return localStorage.getItem('token');
  }

  // Se deconnecter.
  logout(){
    this.userService.logout();
  }
}
