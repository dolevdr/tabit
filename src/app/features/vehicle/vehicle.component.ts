import { Component, computed, inject, OnInit } from '@angular/core';
import { BaseItem } from '../../shared/types/table/base-item';
import { VehicleStore } from './state/vehicle.state';
import { Vehicle } from './types/vehicle.types';

@Component({
    selector: 'app-vehicle',
    standalone: false,
    templateUrl: './vehicle.component.html'
})
export class VehicleComponent implements OnInit {
    vehicleStore = inject(VehicleStore);
    showDetailsDialog = false;
    selectedVehicle: Omit<Vehicle, 'pilots'> | null = null;
    films = computed(() => {
        const isLoading = this.vehicleStore.loading();
        const films = this.vehicleStore.films();
        return isLoading ? null : films;
    });

    ngOnInit() {
        this.vehicleStore.loadVehicles({ reset: true });
    }

    onLoadMore() {
        this.vehicleStore.loadMoreVehicles();
    }

    onLoadPrevious() {
        this.vehicleStore.loadPreviousVehicles();
    }

    onViewDetails(vehicle: BaseItem) {
        const vehicleData = vehicle as Vehicle;
        this.vehicleStore.loadFilms(vehicleData.films);
        const { pilots, ...noPilots } = vehicleData;
        this.selectedVehicle = noPilots;
        this.showDetailsDialog = true;
    }
} 