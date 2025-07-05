import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule,
        HttpClientTestingModule,
        InputSwitchModule,
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Structure', () => {
    it('should have theme toggle container', () => {
      const themeToggle = fixture.nativeElement.querySelector('.theme-toggle-container');
      expect(themeToggle).toBeTruthy();
    });

    it('should have theme toggle switch', () => {
      const themeSwitch = fixture.nativeElement.querySelector('p-inputswitch');
      expect(themeSwitch).toBeTruthy();
    });

    it('should have theme toggle label', () => {
      const themeLabel = fixture.nativeElement.querySelector('.theme-toggle-label');
      expect(themeLabel).toBeTruthy();
    });

    it('should have router outlet', () => {
      const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
      expect(routerOutlet).toBeTruthy();
    });
  });

  describe('Theme Toggle', () => {
    it('should display light mode by default', () => {
      const themeLabel = fixture.nativeElement.querySelector('.theme-toggle-label');
      expect(themeLabel.textContent).toContain('Light');
    });

    it('should toggle theme mode', () => {
      const themeSwitch = fixture.nativeElement.querySelector('p-inputswitch');
      const themeLabel = fixture.nativeElement.querySelector('.theme-toggle-label');

      // Initially should be light mode
      expect(themeLabel.textContent).toContain('Light');

      // Toggle to dark mode
      component.themeStore.setMode('dark');
      fixture.detectChanges();
      expect(themeLabel.textContent).toContain('Dark');
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
