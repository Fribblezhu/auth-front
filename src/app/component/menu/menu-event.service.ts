import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {ReplaySubject} from "rxjs/internal/ReplaySubject";

export interface MenuChangeEvent {
  topic: string;
  message?: string;
  value: any;
}

@Injectable({
  providedIn: 'root'
})
export class MenuEventService {

  constructor() { }

  private _events: ReplaySubject<MenuChangeEvent> = new ReplaySubject<MenuChangeEvent>(1);

  /** * 向其他组件发送信息
   ** @param event 需要发送的信息
   * */
  public sendEvent(event: MenuChangeEvent) {
    this._events.next(event);
  }

  /**
   * *订阅其他组件发送来的消息
   * * @returns {Observable<MenuChangeEvent>}
   * */

  public getEvent(): Observable <MenuChangeEvent> {
    return this._events.asObservable();
  }
}
