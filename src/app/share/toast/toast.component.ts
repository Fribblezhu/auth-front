/**
 * @author: zhu.wenjian
 * @date: 3/5/19
 * @description:
 */
import {StyleSheet} from 'aphrodite';
import {Component, OnInit} from '@angular/core';
import {Toast, ToastService} from './toast.service';
import {debounceTime, map, tap} from 'rxjs/operators';



@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html'
})
export class ToastComponent implements OnInit {
  private style = TOAST_STYLE;
  private toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toastEvents
      .pipe(
        map(
          (toast: Toast) => {
            // here must return a value, if not ! the operator function 'tap' will throw undefined error !
            return this.add(toast);
          }
        ),
        debounceTime(3000),
        tap(
          (toast: Toast) => {
            this.fadeOut(toast);
          }
        ),
        debounceTime(500),
        map(
          (toast) => this.remove(toast)
        )
      ).subscribe();
  }

  private add(toast): Toast {
    toast =  {
      ...toast, styles: [this.style.toastBase, this.style[toast.level]]
    };
    this.toasts.push(toast);
    return  toast;
  }

  private fadeOut(toast) {
    toast.styles = [...toast.styles, this.style.fadeOut];
  }

  private remove(toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}

export const TOAST_STYLE = StyleSheet.create({
  wrapper: {
    position: 'fixed',
    top: '12px',
    right: '12px',
    zIndex: '999999',
    display: 'table',
  },
  list: {
    marginBottom: '12px',
    borderRadius: '50px'
  },
  toastBase: {
    color: 'white',
    opacity: '0.9',
    width: '285px',
    height: '65px',
    display: 'table-cell',
    verticalAlign: 'middle',
    fontWeight: 'bold',
    paddingLeft: '12px',
    boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.25)',
  },
  success: {
    backgroundColor: '#06BC5A',
  },
  warning: {
    backgroundColor: '#F97A1F',
  },
  error: {
    backgroundColor: '#F1432A',
  },
  fadeOut: {
    visibility: 'hidden',
    opacity: '0',
    transition: 'visibility 0s .2s, opacity .2s linear',
  }
});

