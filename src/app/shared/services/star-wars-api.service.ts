import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Starship } from '../../features/starship/types/starship.types';
import { Vehicle } from '../../features/vehicle/types/vehicle.types';
import { Film } from '../types/film.types';
import { TableDetails } from '../types/table/table-details';

@Injectable({
    providedIn: 'root'
})
export class StarWarsApiService {
    private readonly baseUrl = 'https://swapi.py4e.com/api';

    constructor(private http: HttpClient) { }

    getStarships(page: number = 1): Observable<TableDetails<Starship>> {
        return this.http.get<TableDetails<Starship>>(`${this.baseUrl}/starships/`, {
            params: { page }
        });
    }

    getStarshipByName(name: string): Observable<TableDetails<Starship>> {
        return this.http.get<TableDetails<Starship>>(`${this.baseUrl}/starships/`, {
            params: { search: name }
        });
    }

    getVehicles(page: number = 1): Observable<TableDetails<Vehicle>> {
        return this.http.get<TableDetails<Vehicle>>(`${this.baseUrl}/vehicles/`, {
            params: { page }
        });
    }

    getVehicleByName(name: string): Observable<TableDetails<Vehicle>> {
        return this.http.get<TableDetails<Vehicle>>(`${this.baseUrl}/vehicles/`, {
            params: { search: name }
        });
    }

    getFilm(id: number): Observable<Film> {
        return this.http.get<Film>(`${this.baseUrl}/films/${id}/`);
    }
} 