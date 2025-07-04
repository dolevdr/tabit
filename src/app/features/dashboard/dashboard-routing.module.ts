import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathEnum } from '../../app.routes';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: PathEnum.Starships,
                loadChildren: () =>
                    import('../starship/starship.module').then(m => m.StarshipModule)
            },
            {
                path: PathEnum.Vehicles,
                loadChildren: () =>
                    import('../vehicle/vehicle.module').then(m => m.VehicleModule)
            },
            { path: '', redirectTo: PathEnum.Starships, pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { } 