import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Observable, of, throwError } from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';
import { StorageService } from '../services/storage.service';
import { IEmployee } from "../employee"

const GET_EMPLOYEE_URL = 'http://localhost:8092/springBootRest/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

    emptyEmployees: IEmployee[] = [];
    message: string = "";
    action: string = "Error!"
    storageService: StorageService = inject(StorageService);

    constructor(private http: HttpClient, private snackBar: MatSnackBar) {
     }

    getEmployees (): Observable<IEmployee[]> {

        return new Observable(observer => {

            const headers = {'Authorization': this.storageService.getToken(), 'Access-Control-Allow-Origin': '*'};
            this.http.get<IEmployee[]>(GET_EMPLOYEE_URL, { headers })
            .subscribe({
                next: employees => {
                if(employees == null) {
                    this.message = "Invalid user id or password";
                    console.error(this.message);
                    // This is a toaster to show the error
                    this.snackBar.open(this.message, this.action, {duration: 10000,})
                    observer.next(this.emptyEmployees);
                    observer.complete();
                }
                else {
                    observer.next(employees);
                    observer.complete();
                }        
                },
                error: error => {
                this.message = "Error calling login service";
                console.error(this.message);
                // This is a toaster to show the error
                this.snackBar.open(this.message, this.action, {duration: 10000,})
                observer.next(this.emptyEmployees);
                observer.complete();
                }
            });
        })
    }             
}
