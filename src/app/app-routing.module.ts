import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMainComponent } from './app.main.component';
import { AuthGuard } from './controller/guards/auth.guard';
import { AccessDeniedComponent } from './auth/access-denied/access-denied.component';
import { HomeComponent } from './demo/view/home/home.component';
import {LoginAdminComponent} from './module/admin/login-admin/login-admin.component';
import {RegisterAdminComponent} from './module/admin/register-admin/register-admin.component';
import {LoginChercheurComponent} from './module/chercheur/login-chercheur/login-chercheur.component';
import {RegisterChercheurComponent} from './module/chercheur/register-chercheur/register-chercheur.component';
import {LoginModerateurComponent} from './module/moderateur/login-moderateur/login-moderateur.component';
import {RegisterModerateurComponent} from './module/moderateur/register-moderateur/register-moderateur.component';
import {LoginAdherentComponent} from './module/adherent/login-adherent/login-adherent.component';
import {RegisterAdherentComponent} from './module/adherent/register-adherent/register-adherent.component';
@NgModule({
  imports: [
    RouterModule.forRoot(
      [
          { path: '', component: HomeComponent },
        {path: 'admin/login', component: LoginAdminComponent },
        {path: 'admin/register', component: RegisterAdminComponent },
        {path: 'chercheur/login', component: LoginChercheurComponent },
        {path: 'chercheur/register', component: RegisterChercheurComponent },
        {path: 'moderateur/login', component: LoginModerateurComponent },
        {path: 'moderateur/register', component: RegisterModerateurComponent },
        {path: 'adherent/login', component: LoginAdherentComponent },
        {path: 'adherent/register', component: RegisterAdherentComponent },
         {
          path: 'app', // '\'' + root + '\'',
          component: AppMainComponent,
          children: [
            {
              path: 'admin',
              loadChildren: () => import('./module/admin/admin-routing.module').then(m => m.AdminRoutingModule),
              canActivate: [AuthGuard],
            },
            {
              path: 'chercheur',
              loadChildren: () => import('./module/chercheur/chercheur-routing.module').then(m => m.ChercheurRoutingModule),
              canActivate: [AuthGuard],
            },
            {
              path: 'moderateur',
              loadChildren: () => import('./module/moderateur/moderateur-routing.module').then(m => m.ModerateurRoutingModule),
              canActivate: [AuthGuard],
            },
            {
              path: 'adherent',
              loadChildren: () => import('./module/adherent/adherent-routing.module').then(m => m.AdherentRoutingModule),
              canActivate: [AuthGuard],
            },
            { path: 'denied', component: AccessDeniedComponent },
          ],
          canActivate: [AuthGuard]
        },
      ],
      { scrollPositionRestoration: 'enabled' }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
