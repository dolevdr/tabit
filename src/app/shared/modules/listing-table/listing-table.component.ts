import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, input, signal } from '@angular/core';
import { BaseItem } from '../../types/table/base-item';

@Component({
  selector: 'app-listing-table',
  standalone: false,
  templateUrl: './listing-table.component.html',
  styleUrls: ['./listing-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingTableComponent {
  data = input<BaseItem[] | null>(null);
  error = input<string | null>(null);
  loading = input<boolean>(false);
  hasMoreData = input<boolean>(true);
  hasPreviousData = input<boolean>(true);
  totalCount = input<number>(0);
  enableSearch = input<boolean>(false);
  @Output() viewDetailsEvent = new EventEmitter<BaseItem>();
  @Output() loadMoreEvent = new EventEmitter<void>();
  @Output() loadPreviousEvent = new EventEmitter<void>();

  searchTerm = signal<string>('');

  filteredData = computed(() => {
    const currentData = this.data();
    if (!this.enableSearch() || !this.searchTerm() || !currentData) {
      return currentData;
    }

    const term = this.searchTerm().toLowerCase();
    return currentData.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.model.toLowerCase().includes(term)
    );
  });

  onViewDetails(item: BaseItem): void {
    this.viewDetailsEvent.emit(item);
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }
}
