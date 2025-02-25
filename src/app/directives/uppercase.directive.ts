import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUpperCase]',
  standalone: true,
})
export class UpperCaseDirective {
  constructor(
    private el: ElementRef,
    private control: NgControl,
    private renderer: Renderer2
  ) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const upperCaseValue = value.toUpperCase();
    this.renderer.setProperty(this.el.nativeElement, 'value', upperCaseValue);
    this.control.control?.setValue(upperCaseValue, { emitEvent: false });
  }
}
