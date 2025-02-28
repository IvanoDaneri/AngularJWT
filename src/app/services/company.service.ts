import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Observable, of, throwError } from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';
import { StorageService } from '../services/storage.service';
import { ICompany } from "../interfaces/company"

const GET_COMPANY_URL = 'http://localhost:8092/springBootRest/companies';

@Injectable({
    providedIn: 'root' // It garanties that AuthService service is singleton, but window.location.reload() reload application and AuthService is created newly 
  })
export class CompanyService {
 
    emptyCompanies: ICompany[] = [];
    message: string = "";
    action: string = "Error!"
    storageService: StorageService = inject(StorageService);

    constructor(private http: HttpClient, private snackBar: MatSnackBar) {
     }
      

    getCompanies (): Observable<ICompany[]> {

        return new Observable(observer => {

            const headers = {'Authorization': this.storageService.getToken(), 'Access-Control-Allow-Origin': '*'};
            this.http.get<ICompany[]>(GET_COMPANY_URL, { headers })
            .subscribe({
                next: companies => {
                if(companies == null) {
                    this.message = "Invalid user id or password";
                    console.error(this.message);
                    // This is a toaster to show the error
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
                // This is a toaster to show the error
                this.snackBar.open(this.message, this.action, {duration: 10000,})
                observer.next(this.emptyCompanies);
                observer.complete();
                }
            });
        })
    }
    
    addCompany(name: string, code: string, address: string, type: string) {
        console.log(name, code, address, type);
      }
        
}