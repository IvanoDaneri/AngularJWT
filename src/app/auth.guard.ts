import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router,RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

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
  if( localStorage.getItem('isLoggedIn') == "true"){
    status = true;
  }
  else{
    status = false;
  }
  return status;
}

}
