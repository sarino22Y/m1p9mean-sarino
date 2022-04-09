import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private route: Router
  ){

  }
  
  canActivate(){
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      this.route.navigate(['user/login']);
      return false;
    }
  }
  
}
