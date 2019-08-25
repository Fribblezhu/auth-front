import { Injectable } from '@angular/core';
import {HandleError, HttpErrorHandler} from "../../core/handler/http-error-handler";
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../../app.config";
import {Observable} from "rxjs/internal/Observable";
import {RestResponse} from "../../core/core";
import {System} from "./system";
import {getEmptyPage, Page, PageParameter} from "../../core/page/pager";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  private readonly handlerError: HandleError;
  private readonly GET_URL = this.appConfig.apiUrl + '/system/';
  private readonly UPDATE_URL = this.appConfig.apiUrl + '/system/';
  private readonly CREATE_URL = this.appConfig.apiUrl + '/system/create';
  private readonly QUERY_PAGE_URL = this.appConfig.apiUrl + '/system/query-page';
  private readonly CLASSIFY_URL  = this.appConfig.apiUrl + '/system/classify/';

  constructor(private http: HttpClient, private appConfig: AppConfigService,
              private errorHandler: HttpErrorHandler) {
    this.handlerError = errorHandler.createHandleError('System Service');
  }
  public queryPage(pageParameter: PageParameter , param: System): Observable<RestResponse<Page<System>>> {
    return this.http.post<RestResponse<Page<System>>>(this.QUERY_PAGE_URL, {pageParameter, param})
      .pipe(
        catchError(this.handlerError('query page data error.', {data: getEmptyPage()} as RestResponse<Page<System>>))
      );
  }
}
