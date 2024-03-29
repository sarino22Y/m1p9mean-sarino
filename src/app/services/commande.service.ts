import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  apiUrl: string = environment.apiUrl;

  constructor( private http: HttpClient) { }

  /**
   * Retourner la liste de commande.
   * @returns HttpClient
   */
  getAll(): Observable<any>
  {
    return this.http.get(this.apiUrl + '/commandes')
  }

  /**
   * Obtenir un palt.
   * @param id 
   * @returns HttpClient
   */
  getOne(id: number): Observable<any>
  {
    return this.http.get(this.apiUrl + '/commande/' + id) 
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /**
   * Persister un commande.
   * @param data 
   * @returns HttpClient
   */
  create(data:any) {
    return this.http.post(this.apiUrl + '/addcommande/', data) ;
  }

  /**
   * Mise à jour de commande.
   * @return HttpClient
   */
  update(id:number, commande: any) {
    return this.http.put(this.apiUrl + '/updatecommande/' + id, commande);
  }

  /**
   * Supprimer un commande.
   * @param id 
   * @returns 
   */
  delete(id:any) 
  {
    return this.http.delete(this.apiUrl + '/commande/' + id) ;
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
