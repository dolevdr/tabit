import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ListingTableComponent } from './listing-table.component';

@NgModule({
    declarations: [ListingTableComponent],
    imports: [CommonModule, TableModule, ButtonModule],
    exports: [ListingTableComponent]
})
export class ListingTableModule { } 