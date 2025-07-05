import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Starship } from '../../features/starship/types/starship.types';
import { Vehicle } from '../../features/vehicle/types/vehicle.types';
import { Film } from '../types/film.types';
import { StarWarsApiService } from './star-wars-api.service';

describe('StarWarsApiService', () => {
    let service: StarWarsApiService;
    let httpMock: HttpTestingController;

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

    const mockFilm: Film = {
        title: 'Test Film',
        episode_id: 1,
        opening_crawl: 'Test opening crawl',
        director: 'Test Director',
        producer: 'Test Producer',
        release_date: '2023-01-01',
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        created: '2023-01-01',
        edited: '2023-01-01',
        url: 'https://swapi.py4e.com/api/films/1/'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [StarWarsApiService]
        });
        service = TestBed.inject(StarWarsApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getStarships', () => {
        it('should fetch starships with default page 1', () => {
            const mockResponse = {
                count: 1,
                next: null,
                previous: null,
                results: [mockStarship]
            };

            service.getStarships().subscribe(response => {
                expect(response).toEqual(mockResponse);
            });

            const req = httpMock.expectOne('https://swapi.py4e.com/api/starships/?page=1');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should fetch starships with specific page', () => {
            const mockResponse = {
                count: 1,
                next: null,
                previous: null,
                results: [mockStarship]
            };

            service.getStarships(2).subscribe(response => {
                expect(response).toEqual(mockResponse);
            });

            const req = httpMock.expectOne('https://swapi.py4e.com/api/starships/?page=2');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should handle error when fetching starships', () => {
            service.getStarships().subscribe({
                next: () => fail('should have failed'),
                error: (error) => {
                    expect(error.status).toBe(404);
                }
            });

            const req = httpMock.expectOne('https://swapi.py4e.com/api/starships/?page=1');
            req.flush('Not found', { status: 404, statusText: 'Not Found' });
        });
    });

    describe('getStarshipByName', () => {
        it('should fetch starships by name', () => {
            const mockResponse = {
                count: 1,
                next: null,
                previous: null,
                results: [mockStarship]
            };

            service.getStarshipByName('Test').subscribe(response => {
                expect(response).toEqual(mockResponse);
            });

            const req = httpMock.expectOne('https://swapi.py4e.com/api/starships/?search=Test');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('getVehicles', () => {
        it('should fetch vehicles with default page 1', () => {
            const mockResponse = {
                count: 1,
                next: null,
                previous: null,
                results: [mockVehicle]
            };

            service.getVehicles().subscribe(response => {
                expect(response).toEqual(mockResponse);
            });

            const req = httpMock.expectOne('https://swapi.py4e.com/api/vehicles/?page=1');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should fetch vehicles with specific page', () => {
            const mockResponse = {
                count: 1,
                next: null,
                previous: null,
                results: [mockVehicle]
            };

            service.getVehicles(2).subscribe(response => {
                expect(response).toEqual(mockResponse);
            });

            const req = httpMock.expectOne('https://swapi.py4e.com/api/vehicles/?page=2');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('getVehicleByName', () => {
        it('should fetch vehicles by name', () => {
            const mockResponse = {
                count: 1,
                next: null,
                previous: null,
                results: [mockVehicle]
            };

            service.getVehicleByName('Test').subscribe(response => {
                expect(response).toEqual(mockResponse);
            });

            const req = httpMock.expectOne('https://swapi.py4e.com/api/vehicles/?search=Test');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('getFilm', () => {
        it('should fetch film by id', () => {
            service.getFilm(1).subscribe(response => {
                expect(response).toEqual(mockFilm);
            });

            const req = httpMock.expectOne('https://swapi.py4e.com/api/films/1/');
            expect(req.request.method).toBe('GET');
            req.flush(mockFilm);
        });

        it('should handle error when fetching film', () => {
            service.getFilm(999).subscribe({
                next: () => fail('should have failed'),
                error: (error) => {
                    expect(error.status).toBe(404);
                }
            });

            const req = httpMock.expectOne('https://swapi.py4e.com/api/films/999/');
            req.flush('Not found', { status: 404, statusText: 'Not Found' });
        });
    });
}); 