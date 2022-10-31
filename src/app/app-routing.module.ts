import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HomeComponent } from './components/home/home.component';
import { ManagerComponent } from './components/manager/manager.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  //{path:'', redirectTo:'login', pathMatch:'full' },
  {path: '', component: AdminDashboardComponent},
  {path:'login', component: LoginComponent},
  {path:'forgot-password', component: ForgotPasswordComponent},
  {path:'reset-password/:access', component: PasswordResetComponent},
  {path:'sign-up', component: SignUpComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'employee',component: EmployeeComponent, },//canActivate: [AuthGuardService]},
  {path:'manager', component: ManagerComponent, }, //canActivate: [AuthGuardService]},
  {path:'**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
