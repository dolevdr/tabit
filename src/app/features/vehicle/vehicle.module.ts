import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItemDetailsDialogComponent } from '../../shared/components/item-details-dialog/item-details-dialog.component';
import { ListingTableModule } from '../../shared/modules/listing-table/listing-table.module';
import { VehicleComponent } from './vehicle.component';

@NgModule({
    declarations: [VehicleComponent],
    imports: [CommonModule, ListingTableModule, ItemDetailsDialogComponent],
    exports: [VehicleComponent]
})
export class VehicleModule { } 