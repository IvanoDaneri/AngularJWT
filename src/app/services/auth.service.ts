import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Observable, of, throwError } from "rxjs";
import { StorageService } from '../services/storage.service';
import { ICredentials } from '../login';
import { ISession } from '../session';

// Rest service for logon/logoff
const LOGON_URL = 'http://localhost:8092/springBootRest/logon';
const LOGOFF_URL = 'http://localhost:8092/springBootRest/logoff';

@Injectable({
  providedIn: 'root' // It garanties that AuthService service is singleton, but window.location.reload() reload application an AuthService is created newly 
})
export class AuthService {

  storageService: StorageService = inject(StorageService);

  constructor(private http: HttpClient) {
  }

  login(credentials: ICredentials): Observable<ICredentials> {
    return new Observable(observer => {

      const headers = {'Content-Type': 'application/json'}
      const body = JSON.stringify(credentials);
  
      this.http.post<ISession>(LOGON_URL, body, { headers })
      .subscribe({
        next: session => {
          if(session == null) {
            credentials.message = "Invalid user id or password";
            observer.next(credentials);
            observer.complete();
          }
          else {
            credentials.token = session.token;
            this.storageService.saveUser(session);
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
    return this.storageService.isLoggedIn();
  }

  logout() 
  {
    const headers = {'Content-Type':  'application/json', 'Authorization':  this.storageService.getToken()};
    // How to call an http post rest call without to wait for result (this is because http://localhost:8092/springBootRest/logoff return void)
    this.http.post(LOGOFF_URL, null, { headers, responseType: 'text' })
    .subscribe();

    this.storageService.deleteUser();
  }


}
