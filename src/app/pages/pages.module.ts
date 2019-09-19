import { NgModule } from "@angular/core";

import { SharedModule } from '../shared/shared.module';
import {PagesRoutingModule} from './pages-routes.module';

import { PagesComponent } from './pages.component';
import { DashboradComponent } from './dashborad/dashborad.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboradComponent,
        ProgressComponent,
        Graficas1Component
    ],
    exports:[
        DashboradComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports:[
        SharedModule,
        PagesRoutingModule
    ]
})

export class PagesModule {}