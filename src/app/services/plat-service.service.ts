import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { catchError, Observable, throwError } from 'rxjs'

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatService {

  apiLocalUrl: string = environment.apiLocalUrl;

  constructor( private http: HttpClient) { }

  /**
   * Retourner la liste de plat.
   * @returns HttpClient
   */
  getAll(): Observable<any>
  {
    return this.http.get(this.apiLocalUrl + '/plats')
  }

  /**
   * Obtenir un palt.
   * @param id 
   * @returns HttpClient
   */
  getOne(id: number): Observable<any>
  {
    return this.http.get(this.apiLocalUrl + '/plat/' + id) 
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
    return this.http.post(this.apiLocalUrl + '/addplat/', data) ;
  }

  /**
   * Mise à jour de plat.
   * @return HttpClient
   */
  update(id:number, plat: any) {
    return this.http.put(this.apiLocalUrl + '/plat/' + id, plat);
  }

  /**
   * Supprimer un plat.
   * @param id 
   * @returns 
   */
  delete(id:any) 
  {
    return this.http.delete(this.apiLocalUrl + '/plat/' + id) ;
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
