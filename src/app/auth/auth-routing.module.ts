import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from '../auth/components/auth/auth.guard';
import { notAuthGuard } from '../auth/components/auth/notAuth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [notAuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [notAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
