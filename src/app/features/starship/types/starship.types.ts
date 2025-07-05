import { BaseItem } from '../../../shared/types/table/base-item';

export interface Starship extends BaseItem {
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
    pilots: string[];
    created: string;
    edited: string;
    url: string;
} 