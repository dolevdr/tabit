import { Component } from '@angular/core';
import { BaseItem } from '../../shared/types/table/base-item';

@Component({
    selector: 'app-starship',
    standalone: false,
    templateUrl: './starship.component.html'
})
export class StarshipComponent {
    starships: BaseItem[] = [
        { name: 'X-wing', model: 'T-65 X-wing', manufacturer: 'Incom Corporation' },
        { name: 'TIE Fighter', model: 'Twin Ion Engine/Ln Starfighter', manufacturer: 'Sienar Fleet Systems' },
        { name: 'Millennium Falcon', model: 'YT-1300 light freighter', manufacturer: 'Corellian Engineering Corporation' }
    ];
} 