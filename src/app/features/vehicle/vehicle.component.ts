import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { BaseItem } from '../../shared/types/table/base-item';
import { VehicleStore } from './state/vehicle.state';
import { Vehicle } from './types/vehicle.types';

@Component({
    selector: 'app-vehicle',
    standalone: false,
    templateUrl: './vehicle.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
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

    ngOnInit(): void {
        this.vehicleStore.loadVehicles({ reset: true });
    }

    onLoadMore(): void {
        this.vehicleStore.loadMoreVehicles();
    }

    onLoadPrevious(): void {
        this.vehicleStore.loadPreviousVehicles();
    }

    onViewDetails(vehicle: BaseItem): void {
        const vehicleData = vehicle as Vehicle;
        this.vehicleStore.loadFilms(vehicleData.films);
        const { pilots, ...noPilots } = vehicleData;
        this.selectedVehicle = noPilots;
        this.showDetailsDialog = true;
    }
} 