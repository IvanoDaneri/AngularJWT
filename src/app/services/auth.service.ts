import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ILogin } from '../login';
import { catchError } from 'rxjs';
import { Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: 'root' // It garanties that AuthService service is singleton, but window.location.reload() reload application an AuthService is created newly 
})
export class AuthService {

  loginUrl = 'http://localhost:8092/springBootRest/logon';

  constructor(private http: HttpClient) {
   }

  login(credentials: ILogin): Observable<ILogin> {
    return new Observable(observer => {

      const headers = {'content-type': 'application/json'}
      const body=JSON.stringify(credentials);
  
      this.http.post(this.loginUrl, body, { headers, responseType: 'text' })
      .subscribe({
        next: token => {
          if(token == null) {
            credentials.message = "Invalid user id or password";
            observer.next(credentials);
            observer.complete();
          }
          else {
            credentials.token = token;
            localStorage.setItem('token', token)
            localStorage.setItem('isLoggedIn', "true");
            observer.next(credentials);
            observer.complete();
          }        
        },
        error: error => {
          credentials.message = "Error calling login service";
          console.error(credentials.message, error);
          observer.next(credentials);
          observer.complete();
        }
      });
    })
  }

  isLogged(): boolean {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      return true;
    }
    else {
      return false;
    }
  }

  logoutva() {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
  }


}
