import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, model } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';
import { ThemeStore } from '../../../core/state/theme.state';
import { BaseItem } from '../../types/table/base-item';

@Component({
    selector: 'app-item-details-dialog',
    standalone: true,
    imports: [CommonModule, DialogModule, ButtonModule, SkeletonModule],
    templateUrl: './item-details-dialog.component.html',
    styleUrls: ['./item-details-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailsDialogComponent {
    themeStore = inject(ThemeStore);
    item = input<BaseItem | null>(null);
    visible = model<boolean>(false);
    loading = input<boolean>(false);
    films = input<string[] | null>(null);

    itemDetails = computed(() => {
        const item = this.item();
        if (!item || !this.films()) return null;
        return Object.entries(item).map(([key, value]) => ({ key: key.replaceAll('_', ' '), value }))
    });

    isDarkMode = computed(() => this.themeStore.mode() === 'dark');

    onVisibleChange(isVisible: boolean): void {
        this.visible.set(isVisible);
    }
} 