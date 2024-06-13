import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    component: CompanyComponent,
    path: 'company',
    canActivate: [AuthGuard]
  }, 
  {
    component: EmployeeComponent,
    path: 'employee',
    canActivate: [AuthGuard]
  }, 
  {
    component: LoginComponent,
    path: 'login',
  },
  {
    component: LogoutComponent,
    path: 'logout'
  },
  {
    component: HomeComponent,
    path: ''
  },
  { path: "**", redirectTo: "" }
];


@NgModule({
  imports: [RouterModule.forRoot(routes,)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
