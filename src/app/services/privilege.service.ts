import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {
  apiUrl: string = environment.apiUrl;

  constructor( private http: HttpClient) { }

  /**
   * Retourner la liste de privilege.
   * @returns HttpClient
   */
  getAll(): Observable<any>
  {
    return this.http.get(this.apiUrl + '/privileges')
  }

  /**
   * Obtenir un palt.
   * @param id 
   * @returns HttpClient
   */
  getOne(id: number): Observable<any>
  {
    return this.http.get(this.apiUrl + '/privilege/' + id) 
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /**
   * Persister un privilege.
   * @param data 
   * @returns HttpClient
   */
  create(data:any) {
    return this.http.post(this.apiUrl + '/addprivilege/', data) ;
  }

  /**
   * Mise à jour de privilege.
   * @return HttpClient
   */
  update(id:number, privilege: any) {
    return this.http.put(this.apiUrl + '/updateprivilege/' + id, privilege);
  }

  /**
   * Supprimer un privilege.
   * @param id 
   * @returns 
   */
  delete(id:any) 
  {
    return this.http.delete(this.apiUrl + '/privilege/' + id) ;
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
