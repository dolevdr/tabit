import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, debounceTime, delay, distinctUntilChanged, finalize, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { StarWarsApiService } from '../../../shared/services/star-wars-api.service';
import { Vehicle } from '../types/vehicle.types';

const MAX_PAGES = 3;

interface VehicleState {
    loading: boolean;
    error: string | null;
    currentPage: number;
    hasNextPage: boolean;
    totalCount: number;
    pageResults: Record<number, Vehicle[]>;
    firstLoadedPage: number;
    films: string[];
}

const initialState: VehicleState = {
    loading: false,
    error: null,
    currentPage: 1,
    hasNextPage: true,
    totalCount: 0,
    pageResults: {},
    firstLoadedPage: 1,
    films: []
};

export const VehicleStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((state) => ({
        vehicles: computed(() => {
            const pageResults = state.pageResults();
            if (Object.keys(pageResults).length === 0) return null;
            return Object.entries(pageResults).sort(([page1], [page2]) => +page1 - +page2).flatMap(([, value]) => value).map(
                (vehicle) => ({
                    ...vehicle,
                    created: new Date(vehicle.created).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }),
                    edited: new Date(vehicle.edited).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                })
            );
        }),

        vehiclesCount: computed(() => {
            const pageResults = state.pageResults();
            return Object.values(pageResults).reduce((total, pageItems) => total + pageItems.length, 0);
        }),
        hasError: computed(() => state.error() !== null),
        isEmpty: computed(() => {
            const pageResults = state.pageResults();
            const totalItems = Object.values(pageResults).reduce((total, pageItems) => total + pageItems.length, 0);
            return totalItems === 0 && !state.loading();
        }),
        hasPreviousData: computed(() => {
            const currentPageResults = state.pageResults();
            const currentPages = Object.keys(currentPageResults).map(Number).sort((a, b) => a - b);
            const lowestLoadedPage = currentPages.length > 0 ? Math.min(...currentPages) : 1;
            return lowestLoadedPage > 1;
        }),
        hasNextData: computed(() => state.hasNextPage()),
    })),
    withMethods((store) => {
        const apiService = inject(StarWarsApiService);

        const loadVehicles = rxMethod<{ page?: number; reset?: boolean; pageToRemove?: number }>(
            (input$) => input$.pipe(
                debounceTime(300),
                distinctUntilChanged(),
                tap(() => patchState(store, { loading: true, error: null })),
                switchMap(({ page = 1, reset = false, pageToRemove }) => {
                    if (reset) {
                        patchState(store, {
                            currentPage: 1,
                            pageResults: {}
                        });
                    }

                    return apiService.getVehicles(page).pipe(
                        tap(response => {
                            const newVehicles = response.results;
                            let newPageResults: Record<number, Vehicle[]> = { ...store.pageResults() };

                            if (pageToRemove && !reset) {
                                const { [pageToRemove]: removed, ...rest } = newPageResults;
                                newPageResults = rest;
                            }

                            const currentFirstLoadedPage = store.firstLoadedPage();
                            const newFirstLoadedPage = reset ? page : Math.min(currentFirstLoadedPage, page);

                            patchState(store, {
                                currentPage: page,
                                loading: !!response.next,
                                hasNextPage: !!response.next,
                                totalCount: response.count,
                                pageResults: { ...newPageResults, [page]: newVehicles },
                                firstLoadedPage: newFirstLoadedPage
                            });
                        }),
                        delay(500),
                        tap(() => {
                            patchState(store, { loading: false });
                        }),
                        catchError(error => {
                            patchState(store, {
                                loading: false,
                                error: error.message
                            });
                            return of(null);
                        })
                    );
                })
            )
        );

        const loadFilms = rxMethod<string[]>(
            (input$) => input$.pipe(
                tap(() => patchState(store, { loading: true, error: null })),
                switchMap((filmUrls) => {
                    if (!filmUrls || filmUrls.length === 0) {
                        patchState(store, { loading: false });
                        return of([]);
                    }

                    const filmRequests = filmUrls.map(url => {
                        const filmId = url.split('/').filter(Boolean).pop();
                        return apiService.getFilm(Number(filmId)).pipe(map(film => film.title));
                    });

                    return forkJoin(filmRequests).pipe(
                        distinctUntilChanged(),
                        tap((films) => {
                            patchState(store, { films: films.filter(Boolean) });
                        }),
                        catchError(error => {
                            return of([]);
                        }),
                        finalize(() => {
                            patchState(store, { loading: false });
                        })
                    );
                })
            )
        );

        return {
            loadVehicles,
            loadFilms,

            loadMoreVehicles: (): void => {
                if (store.hasNextPage() && !store.loading()) {
                    const currentPageResults = store.pageResults();
                    const currentPages = Object.keys(currentPageResults).map(Number).sort((a, b) => a - b);
                    const nextPage = Math.max(store.currentPage(), currentPages.at(-1) ?? 0) + 1;

                    const pageToRemove = currentPages.length >= MAX_PAGES ? currentPages[0] : undefined;

                    loadVehicles({
                        page: nextPage,
                        pageToRemove
                    });
                }
            },

            loadPreviousVehicles: (): void => {
                const currentPageResults = store.pageResults();
                const currentPages = Object.keys(currentPageResults).map(Number).sort((a, b) => a - b);

                const lowestLoadedPage = Math.min(...currentPages);
                const previousPage = lowestLoadedPage - 1;

                if (previousPage >= 1 && !store.loading()) {
                    const pageToRemove = currentPages.length >= MAX_PAGES ? currentPages[currentPages.length - 1] : undefined;

                    loadVehicles({
                        page: previousPage,
                        pageToRemove
                    });
                }
            },

            clearError: () => patchState(store, { error: null }),

            reset: () => patchState(store, initialState)
        };
    }),
); 