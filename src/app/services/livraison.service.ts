import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {
  apiLocalUrl: string = environment.apiLocalUrl;

  constructor( private http: HttpClient) { }

  /**
   * Retourner la liste de livraison.
   * @returns HttpClient
   */
  getAll(): Observable<any>
  {
    return this.http.get(this.apiLocalUrl + '/livraisons')
  }

  /**
   * Obtenir un palt.
   * @param id 
   * @returns HttpClient
   */
  getOne(id: number): Observable<any>
  {
    return this.http.get(this.apiLocalUrl + '/livraison/' + id) 
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /**
   * Persister un livraison.
   * @param data 
   * @returns HttpClient
   */
  create(data:any) {
    return this.http.post(this.apiLocalUrl + '/addlivraison/', data) ;
  }

  /**
   * Mise à jour de livraison.
   * @return HttpClient
   */
  update(id:number, livraison: any) {
    return this.http.put(this.apiLocalUrl + '/updatelivraison/' + id, livraison);
  }

  /**
   * Supprimer un livraison.
   * @param id 
   * @returns 
   */
  delete(id:any) 
  {
    return this.http.delete(this.apiLocalUrl + '/livraison/' + id) ;
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
