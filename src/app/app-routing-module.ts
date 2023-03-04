import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoggedUserService } from './common/services/loggedUserService';
import { LoggedAdminService } from './common/services/loggedAdminService';
import { UserlistComponent } from './components/dashboard/userlist/userlist.component';
import { AddproductComponent } from './components/dashboard/add-product/addproduct.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'userList', component: UserlistComponent },
  { path: 'addproduct', component: AddproductComponent },
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
  {
    path: 'edit-user/:id',
    canActivate: [LoggedAdminService],
    component: RegisterComponent,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
