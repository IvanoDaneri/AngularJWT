import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuStructure } from "./interfaces/menu"
import { AuthService } from './services/auth.service';


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

  // Definition of menu structure to set to MenuComponent
  public menuStructureList: IMenuStructure[] = [
    {
      id: 1,
      isDropDownMenu: false,
      description: "Company",
      url: "company",
      dropDownTarget: "",
      subMenuList: []
    },
    {
      id: 2,
      isDropDownMenu: false,
      description: "Employee",
      url: "employee",
      dropDownTarget: "",
      subMenuList: []
    }
  ];

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
