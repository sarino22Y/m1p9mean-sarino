import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LivraisonGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private route: Router
  ){}

  // Ekaly et Livreur peut consulter les livraison.
  canActivate() {
    if (this.userService.isEkalyOrDeliverer()) {      
      return true;
    } else {
      this.route.navigate(['']);
      return false;
    }

  }
}