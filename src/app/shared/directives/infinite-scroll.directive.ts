import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

@Directive({
    selector: '[appInfiniteScroll]',
    standalone: true
})
export class InfiniteScrollDirective implements AfterViewInit, OnDestroy {
    @Input() threshold: number = 50; // Distance from top/bottom to trigger
    @Input() disabled: boolean = false;
    @Input() hasPreviousData: boolean = true; // Whether previous data is available
    @Input() hasNextData: boolean = true; // Whether next data is available
    @Output() scrolledToTop = new EventEmitter<void>(); // Load previous page
    @Output() scrolledToBottom = new EventEmitter<void>(); // Load next page

    private scrollHandler = this.onScroll.bind(this);
    private lastScrollTop = 0; // Track last scroll position to prevent duplicate emissions

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.addEventListener('scroll', this.scrollHandler);
    }

    ngOnDestroy(): void {
        this.elementRef.nativeElement.removeEventListener('scroll', this.scrollHandler);
    }

    private onScroll(): void {
        if (this.disabled) {
            return;
        }

        const element = this.elementRef.nativeElement;
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight;
        const clientHeight = element.clientHeight;

        // Check if scrolled to top (load previous)
        if (scrollTop <= this.threshold && this.hasPreviousData && scrollTop < this.lastScrollTop) {
            this.scrolledToTop.emit();
        }

        // Check if scrolled to bottom (load next)
        if (scrollTop + clientHeight >= scrollHeight - this.threshold && this.hasNextData && scrollTop > this.lastScrollTop) {
            this.scrolledToBottom.emit();
        }

        this.lastScrollTop = scrollTop;
    }
} 