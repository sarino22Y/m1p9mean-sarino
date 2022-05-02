import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {
  apiUrl: string = environment.apiUrl;
  private updateLivraisonForm = new Subject<void>();

  constructor( private http: HttpClient) { }

  get updateTheLivraison(){
    return this.updateLivraisonForm;
  }

  /**
   * Retourner la liste de livraison.
   * @returns HttpClient
   */
  getAll(): Observable<any>
  {
    return this.http.get(this.apiUrl + '/livraisons')
  }

  
  /**
   * Obtenir un palt.
   * @param id 
   * @returns HttpClient
   */
  getOne(id: any): Observable<any>
  {
    return this.http.get(this.apiUrl + '/livraison/' + id) 
    .pipe(
      catchError(this.errorHandler)
      )
  }
    
  /**
   * Retourner la liste de livraison.
   * @returns HttpClient
   */
  getAllinfo(): Observable<any>
  {
    return this.http.get(this.apiUrl + '/livraisoninfos')
  }

  /**
   * Persister un livraison.
   * @param data 
   * @returns HttpClient
   */
  create(data:any) {
    return this.http.post(this.apiUrl + '/addlivraison/', data) ;
  }

  /**
   * Mise à jour de livraison.
   * @return HttpClient
   */
  update(id: any, livraison: any) {
    return this.http.put(this.apiUrl + '/livraison/' + id, livraison);
  }

  /**
   * Mise à jour de livraison.
   * @return HttpClient
   */
   updateInfo(id:any, livraisonInfo: any) {
    return this.http.put(this.apiUrl + '/livraisoninfo/' + id, livraisonInfo);
  }

  /**
   * Supprimer une livraison.
   * @param id 
   * @returns 
   */
  delete(id:any) 
  {
    return this.http.delete(this.apiUrl + '/livraison/' + id) ;
  }

  /**
   * Supprimer l'information d'une livraison.
   * @param id 
   * @returns 
   */
   deleteInfo(id:any) 
   {
     return this.http.delete(this.apiUrl + '/livraisoninfo/' + id) ;
   }

  /**
   * Persister l'information de livraison.
   * @param data 
   * @returns HttpClient
   */
   createDeliveryInfo(data:any) {
    return this.http.post(this.apiUrl + '/addlivraisoninfo/', data) ;
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
