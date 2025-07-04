import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ListingTableModule } from '../../shared/modules/listing-table/listing-table.module';
import { StarshipModule } from '../starship/starship.module';
import { VehicleModule } from '../vehicle/vehicle.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    declarations: [DashboardComponent],
    imports: [CommonModule, ListingTableModule, TabViewModule, StarshipModule, VehicleModule, DashboardRoutingModule],
    exports: [DashboardComponent],
})
export class DashboardModule { } 