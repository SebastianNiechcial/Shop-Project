import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoggedUserService } from './common/services/loggedUserService';
import { LoggedAdminService } from './common/services/loggedAdminService';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'shop',
    component: DashboardComponent,
    canActivate: [LoggedUserService],
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [LoggedAdminService],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
