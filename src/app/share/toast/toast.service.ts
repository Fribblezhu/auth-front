/**
 * @author: zhu.wenjian
 * @date: 3/5/19
 * @description:
 */
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export interface Toast {
  level: ToastLevel;
  message: string;
  styles: any[];
}

export interface ToastEvent {
  message: string;
  level: ToastLevel;
}

export enum ToastLevel {
  WARNING = 'warning',
  SUCCESS = 'success',
  ERROR = 'error'
}

@Injectable()
export class ToastService {
  private events: Subject<ToastEvent> = new Subject<Toast>();

  get toastEvents() {
    return this.events;
  }

  public success(msg: string) {
    this.publish({message: msg, level: ToastLevel.SUCCESS});
  }

  public warning(msg: string) {
    this.publish({message: msg, level: ToastLevel.WARNING});
  }

  public error(msg: string) {
    this.publish({message: msg, level: ToastLevel.ERROR});
  }

  private publish(e: ToastEvent) {
    this.events.next(e);
  }
}
