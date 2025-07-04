import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseItem } from '../../types/table/base-item';

@Component({
  selector: 'app-listing-table',
  standalone: false,
  templateUrl: './listing-table.component.html',
  styleUrls: ['./listing-table.component.scss']
})
export class ListingTableComponent {
  @Input() data: BaseItem[] = [];
  @Input() error: string | null = null;
  @Input() loading: boolean = false;
  @Output() viewDetailsEvent = new EventEmitter<BaseItem>();

  onViewDetails(item: BaseItem) {
    this.viewDetailsEvent.emit(item);
  }
}
