import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Observable, of, throwError } from "rxjs";
import { ILogin } from '../login';

@Injectable({
  providedIn: 'root' // It garanties that AuthService service is singleton, but window.location.reload() reload application an AuthService is created newly 
})
export class AuthService {

  logonUrl = 'http://localhost:8092/springBootRest/logon';
  logoffUrl = 'http://localhost:8092/springBootRest/logoff';

  constructor(private http: HttpClient) {
   }

  login(credentials: ILogin): Observable<ILogin> {
    return new Observable(observer => {

      const headers = {'Content-Type': 'application/json'}
      const body = JSON.stringify(credentials);
  
      this.http.post(this.logonUrl, body, { headers, responseType: 'text' })
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
            console.log('User: ' + credentials.user + ' logged')
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

  isLogged(): boolean 
  {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      return true;
    }
    else {
      return false;
    }
  }

  logoutva() 
  {
    const headers = {'Content-Type':  'application/json', 'Authorization':  localStorage.getItem('token')};
    // How to call an http post rest call without to wait for result (this is because http://localhost:8092/springBootRest/logoff return void)
    this.http.post(this.logoffUrl, null, { headers, responseType: 'text' })
    .subscribe()

    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
  }


}
