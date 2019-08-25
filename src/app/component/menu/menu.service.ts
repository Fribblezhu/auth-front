import { Injectable } from '@angular/core';
import {AppConfigService} from "../../app.config";
import {HttpClient} from "@angular/common/http";
import {HandleError, HttpErrorHandler} from "../../core/handler/http-error-handler";
import {Observable} from "rxjs/internal/Observable";
import {catchError} from "rxjs/operators";
import {RestResponse} from "../../core/core";

@Injectable()
export class MenuService {
  private readonly handleError: HandleError;
  private readonly GET_INDEX_MENU = '/resource/queryByResourcePool';

  constructor(private http: HttpClient, private appConfig: AppConfigService,
              private errorHandler: HttpErrorHandler) {
    this.handleError = this.errorHandler.createHandleError('MenuService');
  }

  public getAuthSystemIndexMenu(id): Observable<RestResponse<[Menu]>> {
    return this.http.post<RestResponse<[Menu]>>(this.appConfig.apiUrl + this.GET_INDEX_MENU, {id: id}).pipe(
      catchError(this.handleError('get auth system index menu.', {code: 'error', status: 200, message: '接口错误.'} as RestResponse<[Menu]>))
    );
  }
}

export interface Menu {
  id: string;
  name: string;
  code: string;
  imageUrl?: string;
  url?: string;
  parent?: Menu;
  children?: [Menu];
  comments?: string;
  isExpand?: boolean;
}
