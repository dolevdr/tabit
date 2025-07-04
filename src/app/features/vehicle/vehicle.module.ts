import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListingTableModule } from '../../shared/modules/listing-table/listing-table.module';
import { VehicleComponent } from './vehicle.component';

@NgModule({
    declarations: [VehicleComponent],
    imports: [CommonModule, ListingTableModule],
    exports: [VehicleComponent]
})
export class VehicleModule { } 