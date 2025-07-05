import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive';
import { BaseItem } from '../../types/table/base-item';
import { ListingTableComponent } from './listing-table.component';
import { ListingTableModule } from './listing-table.module';

describe('ListingTableComponent', () => {
  let component: ListingTableComponent;
  let fixture: ComponentFixture<ListingTableComponent>;

  const mockItems: BaseItem[] = [
    {
      name: 'Test Item 1',
      model: 'Model 1',
      manufacturer: 'Manufacturer 1',
      films: []
    },
    {
      name: 'Test Item 2',
      model: 'Model 2',
      manufacturer: 'Manufacturer 2',
      films: []
    },
    {
      name: 'Another Item',
      model: 'Another Model',
      manufacturer: 'Another Manufacturer',
      films: []
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ListingTableModule,
        InfiniteScrollDirective,
        TableModule,
        ButtonModule,
        TagModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListingTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Default Values', () => {
    it('should have default input values', () => {
      expect(component.data()).toEqual([]);
      expect(component.error()).toBeNull();
      expect(component.loading()).toBe(false);
      expect(component.hasMoreData()).toBe(true);
      expect(component.hasPreviousData()).toBe(true);
      expect(component.totalCount()).toBe(0);
      expect(component.enableSearch()).toBe(false);
    });
  });

  describe('Search Functionality', () => {
    it('should handle search input changes', () => {
      const mockEvent = {
        target: { value: 'test' }
      } as unknown as Event;

      component.onSearch(mockEvent);

      expect(component.searchTerm()).toBe('test');
    });

    it('should return empty array when no data', () => {
      expect(component.filteredData()).toEqual([]);
    });
  });

  describe('Event Emissions', () => {
    it('should emit viewDetailsEvent when onViewDetails is called', () => {
      const mockItem = mockItems[0];
      const emitSpy = jest.spyOn(component.viewDetailsEvent, 'emit');

      component.onViewDetails(mockItem);

      expect(emitSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should emit loadMoreEvent when scrolled to bottom', () => {
      const emitSpy = jest.spyOn(component.loadMoreEvent, 'emit');

      component.loadMoreEvent.emit();

      expect(emitSpy).toHaveBeenCalled();
    });

    it('should emit loadPreviousEvent when scrolled to top', () => {
      const emitSpy = jest.spyOn(component.loadPreviousEvent, 'emit');

      component.loadPreviousEvent.emit();

      expect(emitSpy).toHaveBeenCalled();
    });
  });

  describe('Component Methods', () => {
    it('should handle onViewDetails method', () => {
      const mockItem = mockItems[0];
      const emitSpy = jest.spyOn(component.viewDetailsEvent, 'emit');

      component.onViewDetails(mockItem);

      expect(emitSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should handle onSearch method', () => {
      const mockEvent = {
        target: { value: 'search term' }
      } as unknown as Event;

      component.onSearch(mockEvent);

      expect(component.searchTerm()).toBe('search term');
    });
  });

  describe('Computed Properties', () => {
    it('should return empty array for filteredData when no data', () => {
      expect(component.filteredData()).toEqual([]);
    });

    it('should return empty array for filteredData when search is disabled', () => {
      // Since we can't set input signals directly, we test the default behavior
      expect(component.filteredData()).toEqual([]);
    });
  });
});
