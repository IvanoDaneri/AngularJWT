import { Injectable } from '@angular/core';
import { ISession } from '../session';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

// Sessione management
export class StorageService {
  constructor() {}

  session: ISession;

  clean(): void {
    window.sessionStorage.clear();
  }

  public deleteUser(): void {
    window.sessionStorage.removeItem(USER_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public getToken(): string {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
        this.session = JSON.parse(user);
        return this.session.token;
    }

    return null;
  }


  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}