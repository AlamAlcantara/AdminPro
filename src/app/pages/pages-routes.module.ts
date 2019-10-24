import {Routes,RouterModule} from '@angular/router';

import {PagesComponent} from './pages.component';
import {DashboradComponent} from './dashborad/dashborad.component';
import {ProgressComponent} from './progress/progress.component';
import {Graficas1Component} from './graficas1/graficas1.component';
import {UsuariosComponent} from './usuarios/usuarios.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path:'', 
        component: PagesComponent,
        children: [
          {path:'dashboard', component: DashboradComponent},
          {path:'progress', component: ProgressComponent},
          {path:'graficas1', component: Graficas1Component},
          {path:'usuarios', component: UsuariosComponent,data: {titulo:'Mantenimiento de Usuarios'}},
          {path:'', redirectTo:'/dashboard',pathMatch:'full'}
        ]
      }
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

// export const PAGES_ROUTES = RouterModule.forChild(routes);
export class PagesRoutingModule {} 