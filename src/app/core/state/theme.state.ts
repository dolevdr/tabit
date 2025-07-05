import { effect } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';

interface ThemeState {
    mode: 'light' | 'dark';
}

const initialState: ThemeState = {
    mode: 'light',
};

export const ThemeStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => {
        const setMode = (mode: 'light' | 'dark') => {
            patchState(store, { mode });
        };

        const toggleMode = () => {
            patchState(store, {
                mode: store.mode() === 'dark' ? 'light' : 'dark',
            });
        };

        return { setMode, toggleMode };
    }),
    withHooks((store) => {
        const storedMode = localStorage.getItem('mode') as 'dark' | 'light' | null;
        if (!!storedMode) {
            store.setMode(storedMode);
        }

        effect(() => {
            const currentMode = store.mode();
            localStorage.setItem('mode', currentMode);
            const html = document.documentElement;
            html.classList.toggle('my-app-dark', currentMode === 'dark');
        });
        return {};
    })
);
