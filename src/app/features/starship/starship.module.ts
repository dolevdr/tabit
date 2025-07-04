import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListingTableModule } from '../../shared/modules/listing-table/listing-table.module';
import { StarshipComponent } from './starship.component';

@NgModule({
    declarations: [StarshipComponent],
    imports: [CommonModule, ListingTableModule],
    exports: [StarshipComponent]
})
export class StarshipModule { } 