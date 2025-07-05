import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItemDetailsDialogComponent } from '../../shared/components/item-details-dialog/item-details-dialog.component';
import { ListingTableModule } from '../../shared/modules/listing-table/listing-table.module';
import { StarshipComponent } from './starship.component';

@NgModule({
    declarations: [StarshipComponent],
    imports: [CommonModule, ListingTableModule, ItemDetailsDialogComponent],
    exports: [StarshipComponent]
})
export class StarshipModule { } 