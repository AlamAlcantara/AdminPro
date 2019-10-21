import { NgModule } from "@angular/core";

import { SharedModule } from '../shared/shared.module';
import {PagesRoutingModule} from './pages-routes.module';
import {FormsModule} from '@angular/forms';
// import {ChartsModule} from 'ng2-charts';

import { PagesComponent } from './pages.component';
import { DashboradComponent } from './dashborad/dashborad.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { ChartsModule } from 'ng2-charts';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
    declarations: [
        PagesComponent,
        DashboradComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent
    ],
    exports:[
        DashboradComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports:[
        SharedModule,
        PagesRoutingModule,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})

export class PagesModule {}