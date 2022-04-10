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

  nameUser():any{
    return this.userService.nameOfUserConnected();
  }

  loggedIn(){
    return localStorage.getItem('token');
  }

  logout(){
    this.userService.logout();
  }
}
