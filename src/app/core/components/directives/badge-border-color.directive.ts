import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'tui-badged-content[finBadgeBorderColor]'
})
export class BadgeBorderColorDirective implements AfterViewInit {

  @Input('finBadgeBorderColor') finBadgeBorderColor: string;

  constructor(
    private readonly element: ElementRef
  ) {}

  ngAfterViewInit(): void {
    const el = this.element.nativeElement?.childNodes[1] as HTMLElement;
    if (this.finBadgeBorderColor && el instanceof HTMLDivElement) {
      el.style.boxShadow = this.finBadgeBorderColor + ' 0 0 0 2px';
      el.style.pointerEvents = 'none';
    }
  }
}
