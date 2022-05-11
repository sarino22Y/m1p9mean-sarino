import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { catchError, Observable, Subject, throwError } from 'rxjs'

import { environment } from 'src/environments/environment';
import { LivraisonService } from './livraison.service';
import { UserService } from './user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class PlatService {

  apiUrl: string = environment.apiUrl;
  
  private updatePlat = new Subject<void>();

  constructor( 
    private http: HttpClient,
    private livraisonService: LivraisonService,
    private userService: UserService,
    private ngxService: NgxUiLoaderService
    ) { }

  get updateThePlats(){
    return this.updatePlat;
  }

  /**
   * Retourner la liste de plat.
   * @returns HttpClient
   */
  getAll(): Observable<any>
  {
    return this.http.get(this.apiUrl + '/plats');
  }

  /**
   * Obtenir un palt.
   * @param id 
   * @returns HttpClient
   */
  getPlatById(id: any): Observable<any>
  {
    return this.http.get(this.apiUrl + '/plat/' + id) 
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /**
   * Persister un plat.
   * @param data 
   * @returns HttpClient
   */
  create(data:any) {
    return this.http.post(this.apiUrl + '/addplat/', data)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  /**
   * Mise à jour de plat.
   * @return HttpClient
   */
  update(id:any, plat: any) {
    return this.http.put(this.apiUrl + '/plat/' + id, plat)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  /**
   * Supprimer un plat.
   * @param id 
   * @returns 
   */
  delete(id:any) 
  {
    return this.http.delete(this.apiUrl + '/plat/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /**
   * Obtenir la liste des plats vendus.
   * @param
   * @returns 
   */
  getPlatLivraisons(): Observable<any> {
    return this.http.get(this.apiUrl + '/assplatlivraisons')
  }

  /**
   * Créer le plat vendu :
   * Association entre le plat et la livraison,
   * qui stocke l'id du plat, bénéfice et status,
   * aussi l'id de livraison, date de livraison (DateSoldPlat)
   * @param  
   * @returns 
   */
  createPlatDelivery(data: any) {
    return this.http.post(this.apiUrl + '/addassplatlivraisons/', data)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  /**
   * Supprimer un plat.
   * @param id 
   * @returns 
   */
  deletePlatDelivery(id:any) 
   {
      return this.http.delete(this.apiUrl + '/assplatlivraisons/' + id)
      .pipe(
        catchError(this.errorHandler)
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
    return errorMessage;
  }

   /**
   * Methode pour le chargement de page.
   */
    spinner() {
      this.ngxService.start(); // start spinner.
      // Stop spinner en chargement après 5s.
      setTimeout(() => {
        this.ngxService.stop(); // stop spinner.
      }, 5000);
    }
}
