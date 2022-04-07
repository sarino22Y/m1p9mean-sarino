import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

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
    })
  }

  constructor(private http: HttpClient) { }
   
  register(data: IUsers){
    return this.http.post(this.apiUrl + '/register', data, this.httpOptions)
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