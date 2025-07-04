import { PathEnum } from '../../app.routes';

export const DASHBOARD_TABS = [PathEnum.Starships, PathEnum.Vehicles];

export const DASHBOARD_TAB_MAP = DASHBOARD_TABS.reduce((acc, path, index) => {
    acc[path] = index;
    return acc;
}, {} as Record<PathEnum, number>);