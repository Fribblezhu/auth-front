/**
 * @author: zhu.wenjian
 * @date: 3/5/19
 * @description:
 *  to explain a selector names like "[dynamicStyle]=''"
 */
import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {css} from 'aphrodite';

@Directive({
  selector: '[dynamicStyle]'
})
export class DynamicStyleDirective implements OnChanges {
  @Input('dynamicStyle')
  private dynamicStyle: any[];

  constructor(private el: ElementRef, private render: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['dynamicStyle'].isFirstChange()) {
      const preClassValue = changes['dynamicStyle'].previousValue;
      this.render.setAttribute(this.el.nativeElement, 'class', preClassValue);
    }
    const classValue = css(this.dynamicStyle);
    this.render.setAttribute(this.el.nativeElement, 'class', classValue);
  }
}
