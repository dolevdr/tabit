import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';
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
    item = input<BaseItem | null>(null);
    visible = model<boolean>(false);
    loading = input<boolean>(false);
    films = input<string[]>([]);

    itemDetails = computed(() => {
        const item = this.item();
        if (!item) return null;
        return Object.entries(item).map(([key, value]) => ({ key: key.replaceAll('_', ' '), value }))
    });

    isDarkMode = (localStorage.getItem('mode') ?? 'light') === 'dark'

    onVisibleChange(isVisible: boolean): void {
        this.visible.set(isVisible);
    }
} 