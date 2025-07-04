import { Component } from '@angular/core';
import { BaseItem } from '../../shared/types/table/base-item';

@Component({
    selector: 'app-vehicle',
    standalone: false,
    templateUrl: './vehicle.component.html'
})
export class VehicleComponent {
    vehicles: BaseItem[] = [
        { name: 'Sand Crawler', model: 'Digger Crawler', manufacturer: 'Corellia Mining Corporation' },
        { name: 'Speeder Bike', model: '74-Z speeder bike', manufacturer: 'Aratech Repulsor Company' },
        { name: 'AT-AT', model: 'All Terrain Armored Transport', manufacturer: 'Kuat Drive Yards, Imperial Department of Military Research' }
    ];
} 