import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { StarWarsApiService } from '../../shared/services/star-wars-api.service';
import { BaseItem } from '../../shared/types/table/base-item';
import { Vehicle } from './types/vehicle.types';
import { VehicleComponent } from './vehicle.component';
import { VehicleModule } from './vehicle.module';

describe('VehicleComponent', () => {
    let component: VehicleComponent;
    let fixture: ComponentFixture<VehicleComponent>;
    let apiService: any;

    const mockVehicle: Vehicle = {
        name: 'Test Vehicle',
        model: 'Test Model',
        manufacturer: 'Test Manufacturer',
        cost_in_credits: '100000',
        length: '50',
        max_atmosphering_speed: '500',
        crew: '5',
        passengers: '50',
        cargo_capacity: '500',
        consumables: '6 months',
        vehicle_class: 'Test Class',
        pilots: [],
        films: ['https://swapi.py4e.com/api/films/1/'],
        created: '2023-01-01',
        edited: '2023-01-01',
        url: 'https://swapi.py4e.com/api/vehicles/1/'
    };

    beforeEach(async () => {
        const apiSpy = {
            getVehicles: jest.fn(),
            getVehicleByName: jest.fn(),
            getStarships: jest.fn(),
            getStarshipByName: jest.fn(),
            getFilm: jest.fn()
        };

        await TestBed.configureTestingModule({
            imports: [
                VehicleModule,
                DialogModule,
                ButtonModule,
                TagModule
            ],
            providers: [
                { provide: StarWarsApiService, useValue: apiSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(VehicleComponent);
        component = fixture.componentInstance;
        apiService = TestBed.inject(StarWarsApiService) as any;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Initialization', () => {
        it('should have store injected', () => {
            expect(component.vehicleStore).toBeDefined();
        });

        it('should load vehicles on init', () => {
            const loadSpy = jest.spyOn(component.vehicleStore, 'loadVehicles');

            component.ngOnInit();

            expect(loadSpy).toHaveBeenCalledWith({ reset: true });
        });
    });

    describe('Data Loading', () => {
        it('should call store loadMoreVehicles method', () => {
            const loadSpy = jest.spyOn(component.vehicleStore, 'loadMoreVehicles');

            component.onLoadMore();

            expect(loadSpy).toHaveBeenCalled();
        });

        it('should call store loadPreviousVehicles method', () => {
            const loadSpy = jest.spyOn(component.vehicleStore, 'loadPreviousVehicles');

            component.onLoadPrevious();

            expect(loadSpy).toHaveBeenCalled();
        });

        it('should call store loadFilms method when viewing details', () => {
            const loadSpy = jest.spyOn(component.vehicleStore, 'loadFilms');

            component.onViewDetails(mockVehicle as BaseItem);

            expect(loadSpy).toHaveBeenCalledWith(mockVehicle.films);
        });
    });

    describe('Dialog Management', () => {
        it('should open dialog and set selected vehicle when onViewDetails is called', () => {
            const { pilots, ...noPilots } = mockVehicle;

            component.onViewDetails(mockVehicle as BaseItem);

            expect(component.showDetailsDialog).toBe(true);
            expect(component.selectedVehicle).toEqual(noPilots);
        });

        it('should have proper initial dialog state', () => {
            expect(component.showDetailsDialog).toBe(false);
            expect(component.selectedVehicle).toBeNull();
        });
    });

    describe('Store Integration', () => {
        it('should have access to store', () => {
            expect(component.vehicleStore).toBeDefined();
        });

        it('should have computed films property', () => {
            expect(component.films).toBeDefined();
        });
    });

    describe('Component Methods', () => {
        it('should handle onLoadMore method', () => {
            const loadSpy = jest.spyOn(component.vehicleStore, 'loadMoreVehicles');

            component.onLoadMore();

            expect(loadSpy).toHaveBeenCalled();
        });

        it('should handle onLoadPrevious method', () => {
            const loadSpy = jest.spyOn(component.vehicleStore, 'loadPreviousVehicles');

            component.onLoadPrevious();

            expect(loadSpy).toHaveBeenCalled();
        });

        it('should handle onViewDetails method', () => {
            const loadSpy = jest.spyOn(component.vehicleStore, 'loadFilms');
            const { pilots, ...noPilots } = mockVehicle;

            component.onViewDetails(mockVehicle as BaseItem);

            expect(loadSpy).toHaveBeenCalledWith(mockVehicle.films);
            expect(component.showDetailsDialog).toBe(true);
            expect(component.selectedVehicle).toEqual(noPilots);
        });
    });

    describe('Component Lifecycle', () => {
        it('should initialize properly', () => {
            expect(component.showDetailsDialog).toBe(false);
            expect(component.selectedVehicle).toBeNull();
        });

        it('should have proper store integration', () => {
            expect(component.vehicleStore).toBeDefined();
            expect(component.films).toBeDefined();
        });
    });
}); 