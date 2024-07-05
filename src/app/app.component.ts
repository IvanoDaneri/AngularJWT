import { Component, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'AngularJWT';
  authService: AuthService = inject(AuthService);
  checkLogin:boolean=true;
  checkLogout:boolean=false;

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
    console.log('ngOnInit: startup AngularJWT ...');

    if(this.authService.isLogged()) {
      this.checkLogin=false;
      this.checkLogout=true;
    }
    else {
      this.router.navigate(['/login']);
    }
  }
  

  logout() {
    console.log("Logout");
    this.authService.logout();
    this.router.navigate(['/home']);
    location.reload();

  }

}
