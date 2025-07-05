import { BaseItem } from '../../../shared/types/table/base-item';

export interface Vehicle extends BaseItem {
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    vehicle_class: string;
    pilots: string[];
    created: string;
    edited: string;
    url: string;
} 