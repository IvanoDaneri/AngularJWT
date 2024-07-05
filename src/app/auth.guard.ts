import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router,RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  authService: AuthService = inject(AuthService);

  constructor(private router : Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.verifyLogin(url);
}
verifyLogin(url) : any{
  if(!this.isLoggedIn()){
      this.router.navigate(['/login']);
      return false;
  }
  else if(this.isLoggedIn()){
      return true;
  }
}
public isLoggedIn(): boolean{
  let status = false;
  if( this.authService.isLogged()){
    status = true;
  }
  else{
    status = false;
  }
  return status;
}

}
