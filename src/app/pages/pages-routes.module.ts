import {Routes,RouterModule} from '@angular/router';

import {DashboradComponent} from './dashborad/dashborad.component';
import {ProgressComponent} from './progress/progress.component';
import {Graficas1Component} from './graficas1/graficas1.component';
import {UsuariosComponent} from './usuarios/usuarios.component';
import { NgModule } from '@angular/core';
import { PromesasComponent } from './promesas/promesas.component';
import { ProfileComponent } from './profile/profile.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard, VerificarTokenGuard } from '../services/services.index';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

const routes: Routes = [
  {
    path:'dashboard',
    component: DashboradComponent,
    data: {titulo:'Dashboard'},
    canActivate : [VerificarTokenGuard]
  },
  {path:'progress', component: ProgressComponent, data: {titulo:'Progress'}},
  {path:'graficas1', component: Graficas1Component, data: {titulo:'Graficas'}},
  {path:'promesas', component: PromesasComponent, data: {titulo:'Promesas'}},
  {path:'perfil', component: ProfileComponent, data: {titulo:'Perfil'}},
  {path:'rxjs', component:RxjsComponent, data: {titulo:'RxJs'}},
  {path:'account-settings', component:AccountSettingsComponent, data: {titulo:'Ajustes de Tema'}},
  {path:'busqueda/:termino',component: BusquedaComponent, data:{titulo:'Buscador'}},
  //Mantenimiento
  { 
    path:'usuarios',
    component: UsuariosComponent,
    data: {titulo:'Mantenimiento de Usuarios'},
    canActivate: [AdminGuard]
  },
  {path:'hospitales', component: HospitalesComponent, data: {titulo:'Mantenimiento de Hospitales'}},
  {path:'medicos', component: MedicosComponent, data: {titulo:'Mantenimiento de Médicos'}},
  {path:'medico/:id', component: MedicoComponent, data: {titulo:'Actualizar Médico'}},
  {path:'', redirectTo:'/dashboard',pathMatch:'full'}
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

// export const PAGES_ROUTES = RouterModule.forChild(routes);
export class PagesRoutingModule {} 