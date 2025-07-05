import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive';
import { ListingTableComponent } from './listing-table.component';

@NgModule({
    declarations: [ListingTableComponent],
    imports: [CommonModule, TableModule, ButtonModule, TagModule, InfiniteScrollDirective],
    exports: [ListingTableComponent]
})
export class ListingTableModule { } 