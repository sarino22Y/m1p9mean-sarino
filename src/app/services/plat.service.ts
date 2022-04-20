import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { catchError, Observable, Subject, throwError } from 'rxjs'

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatService {

  apiUrl: string = environment.apiUrl;
  
  private updatePlat = new Subject<void>();

  constructor( private http: HttpClient) { }

  get updateThePlats(){
    return this.updatePlat;
  }

  /**
   * Retourner la liste de plat.
   * @returns HttpClient
   */
  getAll(): Observable<any>
  {
    return this.http.get(this.apiUrl + '/plats')
  }

  /**
   * Obtenir un palt.
   * @param id 
   * @returns HttpClient
   */
  getPlatById(id: number): Observable<any>
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
    return this.http.post(this.apiUrl + '/addplat/', data) ;
  }

  /**
   * Mise à jour de plat.
   * @return HttpClient
   */
  update(id:number, plat: any) {
    return this.http.put(this.apiUrl + '/updateplat/' + id, plat);
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
