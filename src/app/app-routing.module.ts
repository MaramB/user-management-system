import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminViewComponent } from './pages/admin/admin-view/admin-view.component';
import { UserViewComponent } from './pages/users/user-view/user-view.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminViewComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'user', component: UserViewComponent, canActivate: [AuthGuard, UserGuard] },  
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
