import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IUsers } from '../models/iusers';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  }

  tokenResponse: any;

  private updateMenu = new Subject<void>();
  get updateTheMenu(){
    return this.updateMenu;
  }

  constructor(private http: HttpClient) { }
   
  /**
   * Methode pour s'enregistrer en tant que client.
   * @param data 
   * @returns 
   */
  register(data: IUsers){
    return this.http.post(this.apiUrl + '/register-client', data, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /**
   * Methode pour s'enregistrer en tant que restaurant.
   * @param data 
   * @returns 
   */
   registerRestaurant(data: IUsers){
    return this.http.post(this.apiUrl + '/register-restaurant', data, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /**
   * Methode pour s'enregistrer en tant que livreur.
   * @param data 
   * @returns 
   */
   registerDeliverer(data: IUsers){
    return this.http.post(this.apiUrl + '/register-deliverer', data, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /**
   * Methode pour s'enregistrer en tant que ekaly.
   * @param data 
   * @returns 
   */
   registerEkaly(data: IUsers){
    return this.http.post(this.apiUrl + '/register-ekaly', data, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /**
   * Methode pour se connecter en tant que client.
   * @param data 
   * @returns 
   */
  login(data: any){
    return this.http.post(this.apiUrl + '/users/login-client', data, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerLogin)
    )
  }

  /**
   * Methode pour se connecter en tant que ekaly.
   * @param data 
   * @returns 
   */
   loginRestaurant(data: any){
    return this.http.post(this.apiUrl + '/users/login-restaurant', data, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerLogin)
    )
  }

  /**
   * Methode pour se connecter en tant que livreur.
   * @param data 
   * @returns 
   */
   loginDeliverer(data: any){
    return this.http.post(this.apiUrl + '/users/login-deliverer', data, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerLogin)
    )
  }

  /**
   * Methode pour se connecter en tant que ekaly.
   * @param data 
   * @returns 
   */
   loginEkaly(data: any){
    return this.http.post(this.apiUrl + '/users/login-ekaly', data, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerLogin)
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
   * Obtenir le Token.
   * 
   * @returns 
   */
  getToken():any{
    return localStorage.getItem('token') != '';
  }

  /**
   * Obtenir le Token.
   * 
   * @returns 
   */
  getRoleByToken(token:any){  
      token = localStorage.getItem('token')||'';
      var extractToken = token.split('.')[1];
      var atobData = atob(extractToken);
      var finaldata = JSON.parse(atobData);
      return finaldata.role;
   
  }

  /**
   * retourner le nom d'utilisateur connecté.
   * 
   */
   nameOfUserConnected():any{
    if (localStorage.getItem('token')) {
      var loginToken = localStorage.getItem('token')||'';
      var extractToken = loginToken.split('.')[1];
      var atobData = atob(extractToken);
      var finaldata = JSON.parse(atobData);
      return finaldata.username;
    }
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
    
    if (finaldata.role == 'ekaly') {
      return true;
    }
    alert("Vous n'avez pas l'autorisation de consulter cette page.")
    return false;    
  }

  /**
   * Retourner la liste de restaurant.
   * @returns HttpClient
   */
   getAll(): Observable<any>
   {
     return this.http.get(this.apiUrl + '/users')
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

  /**
   * Capture d'erreur login.
   * @param error 
   * @returns error
   */
   errorHandlerLogin(error: any)
  {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = "Erreurr: ${error.status}\nMessage: ${error.message}"
    }
    alert("Veiullez vous rendre sur le login correspondant à votre compte.")
    return errorMessage;
   }
}
