import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboradComponent } from './pages/dashborad/dashborad.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { PromesasComponent } from './pages/promesas/promesas.component';
import { RxjsComponent } from './pages/rxjs/rxjs.component';
import { LoginGuardGuard } from './services/services.index';
import { ProfileComponent } from './pages/profile/profile.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { HospitalesComponent } from './pages/hospitales/hospitales.component';

const routes: Routes = [
  {
    path:'', 
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {path:'dashboard', component: DashboradComponent, data: {titulo:'Dashboard'}},
      {path:'progress', component: ProgressComponent, data: {titulo:'Progress'}},
      {path:'graficas1', component: Graficas1Component, data: {titulo:'Graficas'}},
      {path:'promesas', component: PromesasComponent, data: {titulo:'Promesas'}},
      {path:'perfil', component: ProfileComponent, data: {titulo:'Perfil'}},
      {path:'rxjs', component:RxjsComponent, data: {titulo:'RxJs'}},
      {path:'account-settings', component:AccountSettingsComponent, data: {titulo:'Ajustes de Tema'}},
      //Mantenimiento
      {path:'usuarios', component: UsuariosComponent, data: {titulo:'Mantenimiento de Usuarios'}},
      {path:'hospitales', component: HospitalesComponent, data: {titulo:'Mantenimiento de hospitales'}},
      {path:'', redirectTo:'/dashboard',pathMatch:'full'}
    ]
  },
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'**', component: NopagefoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
