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
  isLoggedin: boolean = false;

  private updateMenu = new Subject<void>();
  get updateTheMenu(){
    return this.updateMenu;
  }

  constructor(private http: HttpClient) { }

  /**
   * Methode pour s'enregistrer pour tout.
   * @param data 
   * @returns 
   */
   registerByAdmin(data: IUsers){
    return this.http.post(this.apiUrl + '/register', data, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
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
   * Methode pour se connecter.
   * @param data 
   * @returns 
   */
  login(data: any){
    return this.http.post(this.apiUrl + '/users/login', data, this.httpOptions)
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
    if (!localStorage.getItem("token")) {
      this.isLoggedin = false;
      return this.isLoggedin;
    }
    else {
      return true;
    }
  }

  /**
   * retourner le rôle d'utilisateur connecté.
   * 
   */
   roleOfUserConnected():any{
    if (localStorage.getItem('token')) {
      var loginToken = localStorage.getItem('token')||'';
      var extractToken = loginToken.split('.')[1];
      var atobData = atob(extractToken);
      var finaldata = JSON.parse(atobData);
      return finaldata.role;
    }
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
   * retourner l'id de l'utilisateur connecté.
   * 
   */
   idOfUserConnected():any{
    if (localStorage.getItem('token')) {
      var loginToken = localStorage.getItem('token')||'';
      var extractToken = loginToken.split('.')[1];
      var atobData = atob(extractToken);
      var finaldata = JSON.parse(atobData);
      return finaldata.user_id;
    }
  }

  // /**
  //  * Modifier la valeur de boolean connected :
  //  * Si true, user connected
  //  * Si false, user deconnected
  //  * @param connected 
  //  */
  //   setIsUserConnected(connected: boolean) {
  //     this.isUserConnected = connected;
  //   }

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
      token = localStorage.getItem('token') ? localStorage.getItem('token'): null;
      if (token) {        
        var extractToken = token.split('.')[1];
        var atobData = atob(extractToken);
        var finaldata = JSON.parse(atobData);
        return finaldata.role;
      } else {
        return false;
      }
  }

  /**
   * Obtenir un user par son id.
   * @param id 
   * @returns HttpClient
   */
  getUserById(id: any): Observable<any>
  {
    return this.http.get(this.apiUrl + '/users/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
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
   * Accès aux données.
   * 
   */
   isEkalyOrDeliverer(){
    var loginToken = localStorage.getItem('token')||'';
    var extractToken = loginToken.split('.')[1];
    var atobData = atob(extractToken);
    var finaldata = JSON.parse(atobData);
    
    if (finaldata.role == 'ekaly' || finaldata.role == 'deliverer') {
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
   * Supprimer un utilisateur.
   * @returns HttpClient
   */
    delete(idUser: any){
      return this.http.delete(this.apiUrl + '/users/' + idUser, this.httpOptions)
      .pipe(
        catchError(this.errorHandlerLogin)
      )
    }

     /**
   * Supprimer un utilisateur.
   * @returns HttpClient
   */
    edit(id: any, data: any){
      return this.http.put(this.apiUrl + '/users/' + id, data, this.httpOptions)
      .pipe(
        catchError(this.errorHandlerLogin)
      )
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
    alert("Une erreur s'est produite, veuillez réessayer ultérieurement.");
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
    alert("Une erreur s'est produite, veuillez réessayer ultérieurement.");
    return errorMessage;
  }
}
