import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[finCaptureParentClass]'
})
export class CaptureParentClassDirective {

  constructor(
    private readonly element: ElementRef
  ) {}

  ngAfterViewInit(): void {
    const parentClassName = this.element?.nativeElement?.parentElement?.className;
    if (parentClassName) {
      this.element.nativeElement.className += ` ${parentClassName}`;
    }
  }
}
