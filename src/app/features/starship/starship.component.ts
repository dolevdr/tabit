import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { BaseItem } from '../../shared/types/table/base-item';
import { StarshipStore } from './state/starship.state';
import { Starship } from './types/starship.types';

@Component({
    selector: 'app-starship',
    standalone: false,
    templateUrl: './starship.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipComponent implements OnInit {
    starshipStore = inject(StarshipStore);
    showDetailsDialog = false;
    selectedStarship: Omit<Starship, 'pilots'> | null = null;
    films = computed(() => {
        const isLoading = this.starshipStore.loading();
        const films = this.starshipStore.films();
        return isLoading ? null : films;
    });

    ngOnInit(): void {
        this.starshipStore.loadStarships({ reset: true });
    }

    onLoadMore(): void {
        this.starshipStore.loadMoreStarships();
    }

    onLoadPrevious(): void {
        this.starshipStore.loadPreviousStarships();
    }

    onViewDetails(starship: BaseItem): void {
        const starshipData = starship as Starship;
        this.starshipStore.loadFilms(starshipData.films);
        const { pilots, ...noPilots } = starshipData;
        this.selectedStarship = noPilots
        this.showDetailsDialog = true;
    }
}