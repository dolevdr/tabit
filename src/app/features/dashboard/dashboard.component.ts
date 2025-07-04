import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PathEnum } from '../../app.routes';
import { DASHBOARD_TABS, DASHBOARD_TAB_MAP } from './dashboard.config';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    standalone: false,
})
export class DashboardComponent implements OnInit {
    tabRoutes = DASHBOARD_TABS;
    selectedTabIndex = 0;

    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        const currentPath = this.route.snapshot.firstChild?.routeConfig?.path as PathEnum;
        this.selectedTabIndex = DASHBOARD_TAB_MAP[currentPath] ?? 0;
    }

    onTabChange(event: any) {
        this.selectedTabIndex = event.index;
        this.router.navigate([this.tabRoutes[event.index]], { relativeTo: this.route });
    }
} 