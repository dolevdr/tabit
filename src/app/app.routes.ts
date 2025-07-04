import { Routes } from '@angular/router';

export enum PathEnum {
    Dashboard = 'dashboard',
    Starships = 'starships',
    Vehicles = 'vehicles'
}

export const routes: Routes = [
    {
        path: PathEnum.Dashboard,
        loadChildren: () =>
            import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    { path: '', redirectTo: PathEnum.Dashboard, pathMatch: 'full' }
];