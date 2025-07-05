import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { DashboardComponent } from './dashboard.component';
import { DashboardModule } from './dashboard.module';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                DashboardModule,
                RouterTestingModule,
                ButtonModule,
                CardModule,
                TabViewModule,
                HttpClientTestingModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Tab Navigation', () => {
        it('should have tab view', () => {
            const tabView = fixture.nativeElement.querySelector('p-tabview');
            expect(tabView).toBeTruthy();
        });

        it('should have starship tab panel', () => {
            const starshipTab = fixture.nativeElement.querySelector('p-tabpanel[header="Starships"]');
            expect(starshipTab).toBeTruthy();
        });

        it('should have vehicle tab panel', () => {
            const vehicleTab = fixture.nativeElement.querySelector('p-tabpanel[header="Vehicles"]');
            expect(vehicleTab).toBeTruthy();
        });

        it('should have two tab panels', () => {
            const tabPanels = fixture.nativeElement.querySelectorAll('p-tabpanel');
            expect(tabPanels.length).toBe(2);
        });
    });

    describe('Component Structure', () => {
        it('should have starship component', () => {
            const starshipComponent = fixture.nativeElement.querySelector('app-starship');
            expect(starshipComponent).toBeTruthy();
        });

        it('should have vehicle component', () => {
            const vehicleComponent = fixture.nativeElement.querySelector('app-vehicle');
            expect(vehicleComponent).toBeTruthy();
        });
    });

    describe('Component Lifecycle', () => {
        it('should initialize properly', () => {
            expect(component).toBeDefined();
        });

        it('should render without errors', () => {
            expect(() => fixture.detectChanges()).not.toThrow();
        });
    });
}); 