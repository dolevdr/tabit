import { BaseItem } from './base-item';

export interface TableDetails<T extends BaseItem> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
} 