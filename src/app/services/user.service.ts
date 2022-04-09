import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IUsers } from '../models/iusers';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  [x: string]: any;
  apiUrl: string = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  }

  constructor(private http: HttpClient) { }
   
  /**
   * Methode pour s'enregistrer.
   * @param data 
   * @returns 
   */
  register(data: IUsers){
    return this.http.post(this.apiUrl + '/register', data, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /**
   * Methode pour se connecter.
   * @param data 
   * @returns 
   */
  login(data: any){
    return this.http.post(this.apiUrl + '/login', data, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /**
   * logout.
   */  
  logout(){
    localStorage.clear();
    localStorage.removeItem("token");
  }

  /**
   * Utilisateur connecté.
   * @returns token
   */
  isLoggedIn(){
    return localStorage.getItem('token') != null;
  }

  /**
   * Accès aux données.
   * 
   */
  haveAcces(){
    var loginToken = localStorage.getItem('token')||'';
    var extractToken = loginToken.split('.')[1];
    var atobData = atob(extractToken);
    var finaldata = JSON.parse(atobData);
    
    if (finaldata.username == 'sarino') {
      return true;
    }
    alert("Vous n'avez pas l'autorisation de consulter cette page.")
    return false;    
  }

  /**
   * Capture d'erreur.
   * @param error 
   * @returns error
   */
   errorHandler(error: any)
  {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = "Erreurr: ${error.status}\nMessage: ${error.message}"
    }
    return errorMessage;
   }
}
