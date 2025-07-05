import { NgFor } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InfiniteScrollDirective } from './infinite-scroll.directive';

@Component({
    template: `
    <div 
      appInfiniteScroll 
      [disabled]="disabled" 
      [hasPreviousData]="hasPreviousData" 
      [hasNextData]="hasNextData"
      [threshold]="threshold"
      (scrolledToTop)="onScrolledToTop()" 
      (scrolledToBottom)="onScrolledToBottom()"
      style="height: 200px; overflow-y: auto;">
      <div style="height: 1000px;">
        <div *ngFor="let item of items">{{ item }}</div>
      </div>
    </div>
  `,
    standalone: true,
    imports: [InfiniteScrollDirective, NgFor]
})
class TestComponent {
    disabled = false;
    hasPreviousData = true;
    hasNextData = true;
    threshold = 50;
    items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

    onScrolledToTop() { }
    onScrolledToBottom() { }
}

describe('InfiniteScrollDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directive: InfiniteScrollDirective;
    let element: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        element = fixture.debugElement.query(By.directive(InfiniteScrollDirective));
        if (!element) {
            throw new Error('InfiniteScrollDirective not found in test component');
        }
        directive = element.injector.get(InfiniteScrollDirective);

        // Ensure directive is initialized
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
    });

    describe('Input Properties', () => {
        it('should have default values', () => {
            expect(directive.disabled).toBe(false);
            expect(directive.hasPreviousData).toBe(true);
            expect(directive.hasNextData).toBe(true);
            expect(directive.threshold).toBe(50);
        });

        it('should accept input values', () => {
            component.disabled = true;
            component.hasPreviousData = false;
            component.hasNextData = false;
            component.threshold = 100;
            fixture.detectChanges();

            expect(directive.disabled).toBe(true);
            expect(directive.hasPreviousData).toBe(false);
            expect(directive.hasNextData).toBe(false);
            expect(directive.threshold).toBe(100);
        });
    });

    describe('Directive Properties', () => {
        it('should have scrolledToTop output', () => {
            expect(directive.scrolledToTop).toBeDefined();
            expect(typeof directive.scrolledToTop.emit).toBe('function');
        });

        it('should have scrolledToBottom output', () => {
            expect(directive.scrolledToBottom).toBeDefined();
            expect(typeof directive.scrolledToBottom.emit).toBe('function');
        });

        it('should have elementRef', () => {
            expect(directive['elementRef']).toBeDefined();
            expect(directive['elementRef'].nativeElement).toBe(element.nativeElement);
        });
    });

    describe('Directive Methods', () => {
        it('should have ngAfterViewInit method', () => {
            expect(typeof directive.ngAfterViewInit).toBe('function');
        });

        it('should have ngOnDestroy method', () => {
            expect(typeof directive.ngOnDestroy).toBe('function');
        });

        it('should have onScroll method', () => {
            expect(typeof directive['onScroll']).toBe('function');
        });
    });

    describe('Event Emitters', () => {
        it('should emit scrolledToTop event', () => {
            const topSpy = jest.spyOn(component, 'onScrolledToTop');

            directive.scrolledToTop.emit();

            expect(topSpy).toHaveBeenCalled();
        });

        it('should emit scrolledToBottom event', () => {
            const bottomSpy = jest.spyOn(component, 'onScrolledToBottom');

            directive.scrolledToBottom.emit();

            expect(bottomSpy).toHaveBeenCalled();
        });
    });

    describe('Component Integration', () => {
        it('should be applied to the correct element', () => {
            const scrollElement = element.nativeElement;
            expect(scrollElement.style.height).toBe('200px');
            expect(scrollElement.style.overflowY).toBe('auto');
        });

        it('should have scrollable content', () => {
            const scrollElement = element.nativeElement;
            const contentElement = scrollElement.querySelector('div[style*="height: 1000px"]');
            expect(contentElement).toBeTruthy();
        });

        it('should have items rendered', () => {
            const items = element.nativeElement.querySelectorAll('div');
            expect(items.length).toBeGreaterThan(0);
        });
    });
}); 