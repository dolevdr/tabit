import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { StarWarsApiService } from '../../shared/services/star-wars-api.service';
import { BaseItem } from '../../shared/types/table/base-item';
import { StarshipComponent } from './starship.component';
import { StarshipModule } from './starship.module';
import { Starship } from './types/starship.types';

describe('StarshipComponent', () => {
    let component: StarshipComponent;
    let fixture: ComponentFixture<StarshipComponent>;
    let apiService: jest.Mocked<StarWarsApiService>;

    const mockStarship: Starship = {
        name: 'Test Starship',
        model: 'Test Model',
        manufacturer: 'Test Manufacturer',
        cost_in_credits: '1000000',
        length: '100',
        max_atmosphering_speed: '1000',
        crew: '10',
        passengers: '100',
        cargo_capacity: '1000',
        consumables: '1 year',
        hyperdrive_rating: '1.0',
        MGLT: '100',
        starship_class: 'Test Class',
        pilots: [],
        films: ['https://swapi.py4e.com/api/films/1/'],
        created: '2023-01-01',
        edited: '2023-01-01',
        url: 'https://swapi.py4e.com/api/starships/1/'
    };

    beforeEach(async () => {
        const apiSpy = {
            getStarships: jest.fn(),
            getStarshipByName: jest.fn(),
            getVehicles: jest.fn(),
            getVehicleByName: jest.fn(),
            getFilm: jest.fn()
        };

        await TestBed.configureTestingModule({
            imports: [
                StarshipModule,
                DialogModule,
                ButtonModule,
                TagModule
            ],
            providers: [
                { provide: StarWarsApiService, useValue: apiSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(StarshipComponent);
        component = fixture.componentInstance;
        apiService = TestBed.inject(StarWarsApiService) as any;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Initialization', () => {
        it('should have store injected', () => {
            expect(component.starshipStore).toBeDefined();
        });

        it('should load starships on init', () => {
            const loadSpy = jest.spyOn(component.starshipStore, 'loadStarships');

            component.ngOnInit();

            expect(loadSpy).toHaveBeenCalledWith({ reset: true });
        });
    });

    describe('Data Loading', () => {
        it('should call store loadMoreStarships method', () => {
            const loadSpy = jest.spyOn(component.starshipStore, 'loadMoreStarships');

            component.onLoadMore();

            expect(loadSpy).toHaveBeenCalled();
        });

        it('should call store loadPreviousStarships method', () => {
            const loadSpy = jest.spyOn(component.starshipStore, 'loadPreviousStarships');

            component.onLoadPrevious();

            expect(loadSpy).toHaveBeenCalled();
        });

        it('should call store loadFilms method when viewing details', () => {
            const loadSpy = jest.spyOn(component.starshipStore, 'loadFilms');

            component.onViewDetails(mockStarship as BaseItem);

            expect(loadSpy).toHaveBeenCalledWith(mockStarship.films);
        });
    });

    describe('Dialog Management', () => {
        it('should open dialog and set selected starship when onViewDetails is called', () => {
            const { pilots, ...noPilots } = mockStarship;

            component.onViewDetails(mockStarship as BaseItem);

            expect(component.showDetailsDialog).toBe(true);
            expect(component.selectedStarship).toEqual(noPilots);
        });

        it('should have proper initial dialog state', () => {
            expect(component.showDetailsDialog).toBe(false);
            expect(component.selectedStarship).toBeNull();
        });
    });

    describe('Store Integration', () => {
        it('should have access to store', () => {
            expect(component.starshipStore).toBeDefined();
        });

        it('should have computed films property', () => {
            expect(component.films).toBeDefined();
        });
    });

    describe('Component Methods', () => {
        it('should handle onLoadMore method', () => {
            const loadSpy = jest.spyOn(component.starshipStore, 'loadMoreStarships');

            component.onLoadMore();

            expect(loadSpy).toHaveBeenCalled();
        });

        it('should handle onLoadPrevious method', () => {
            const loadSpy = jest.spyOn(component.starshipStore, 'loadPreviousStarships');

            component.onLoadPrevious();

            expect(loadSpy).toHaveBeenCalled();
        });

        it('should handle onViewDetails method', () => {
            const loadSpy = jest.spyOn(component.starshipStore, 'loadFilms');
            const { pilots, ...noPilots } = mockStarship;

            component.onViewDetails(mockStarship as BaseItem);

            expect(loadSpy).toHaveBeenCalledWith(mockStarship.films);
            expect(component.showDetailsDialog).toBe(true);
            expect(component.selectedStarship).toEqual(noPilots);
        });
    });

    describe('Component Lifecycle', () => {
        it('should initialize properly', () => {
            expect(component.showDetailsDialog).toBe(false);
            expect(component.selectedStarship).toBeNull();
        });

        it('should have proper store integration', () => {
            expect(component.starshipStore).toBeDefined();
            expect(component.films).toBeDefined();
        });
    });
}); 