import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  apiUrl: string = environment.apiUrl;

  constructor( private http: HttpClient) { }

  /**
   * Retourner la liste de restaurant.
   * @returns HttpClient
   */
  getAll(): Observable<any>
  {
    return this.http.get(this.apiUrl + '/restaurants')
  }

  /**
   * Obtenir un palt.
   * @param id 
   * @returns HttpClient
   */
  getOne(id: number): Observable<any>
  {
    return this.http.get(this.apiUrl + '/restaurant/' + id) 
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /**
   * Persister un restaurant.
   * @param data 
   * @returns HttpClient
   */
  create(data:any) {
    return this.http.post(this.apiUrl + '/addrestaurant/', data) ;
  }

  /**
   * Mise à jour de restaurant.
   * @return HttpClient
   */
  update(id:number, restaurant: any) {
    return this.http.put(this.apiUrl + '/updaterestaurant/' + id, restaurant);
  }

  /**
   * Supprimer un restaurant.
   * @param id 
   * @returns 
   */
  delete(id:any) 
  {
    return this.http.delete(this.apiUrl + '/restaurant/' + id) ;
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
