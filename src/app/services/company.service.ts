import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Observable, of, throwError } from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';
import { ICompany } from "../company"

@Injectable({
    providedIn: 'root' // It garanties that AuthService service is singleton, but window.location.reload() reload application an AuthService is created newly 
  })
export class CompanyService {
 
    urlCompany = 'http://localhost:8092/springBootRest/companies';
    emptyCompanies: ICompany[] = [];
    message: string = "";
    action: string = "Error!"

    constructor(private http: HttpClient, private snackBar: MatSnackBar) {
     }
      

    getCompanies (): Observable<ICompany[]> {

        return new Observable(observer => {

            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    'Authorization':  localStorage.getItem('token')
                })};
        
            const headers = {'Authorization':  localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*'};
            // this.http.get<ICompany[]>(this.urlCompany, { headers })

            // this.http.get<ICompany[]>(this.urlCompany, { withCredentials: true })
            this.http.get<ICompany[]>(this.urlCompany, { headers })
            .subscribe({
                next: companies => {
                if(companies == null) {
                    this.message = "Invalid user id or password";
                    console.error(this.message);
                    this.snackBar.open(this.message, this.action, {duration: 10000,})
                    observer.next(this.emptyCompanies);
                    observer.complete();
                }
                else {
                    observer.next(companies);
                    observer.complete();
                }        
                },
                error: error => {
                this.message = "Error calling login service";
                console.error(this.message);
                this.snackBar.open(this.message, this.action, {duration: 10000,})
                observer.next(this.emptyCompanies);
                observer.complete();
                }
            });
        })
    }        
}