import { Injectable } from '@angular/core';
import {HandleError, HttpErrorHandler} from "../../core/handler/http-error-handler";
import {Observable} from "rxjs/internal/Observable";
import {IdentityModel, RestResponse} from "../../core/core";
import {catchError} from "rxjs/operators";
import {AppConfigService} from "../../app.config";
import {getEmptyPage, Page, PageParameter} from "../../core/page/pager";
import {HttpClient} from "@angular/common/http";
import {Code} from "../code/code";

export interface Codec extends IdentityModel {
  id?: string;
  code?: string;
  name?: string;
  status?: number;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CodeCService {
  private readonly handlerError: HandleError;
  private readonly QUERY_PAGE_URL = this.appConfig.apiUrl + '/codec/query-page';
  private readonly GET_URL = this.appConfig.apiUrl + '/codec/';
  private readonly UPDATE_URL = this.appConfig.apiUrl + '/codec/';
  private readonly CREATE_URL = this.appConfig.apiUrl + '/codec/create';
  private readonly QUERY_LIST_URL = this.appConfig.apiUrl + '/codec/query-list';
  constructor(private http: HttpClient, private appConfig: AppConfigService,
              private errorHandler: HttpErrorHandler) {
    this.handlerError = errorHandler.createHandleError('Codec Service');
  }

  public get(id: string): Observable<RestResponse<Codec>> {
    return this.http.get<RestResponse<Codec>>(this.GET_URL + id)
      .pipe(
        catchError(this.handlerError('get single error.', {data: null} as RestResponse<Code>))
      );
  }
  public update(id: string, data: Codec): Observable<RestResponse<Code>> {
    return this.http.put<RestResponse<Code>>(this.UPDATE_URL + id, data)
      .pipe(
        catchError(this.handlerError('update single error.', {data: null} as RestResponse<Code>))
      );
  }

  public create(data: Code): Observable<RestResponse<Code>> {
    return this.http.post<RestResponse<Code>>(this.CREATE_URL, data)
      .pipe(
        catchError(this.handlerError('create single error.', {data: null} as RestResponse<Code>))
      );
  }

  public queryPage(pageParameter: PageParameter, model: Codec): Observable<RestResponse<Page<Codec>>> {
    return this.http.post<RestResponse<Page<Codec>>>(this.QUERY_PAGE_URL, {pageParameter, model})
      .pipe(
        catchError(this.handlerError('query page error.', {data: getEmptyPage()} as RestResponse<Page<Codec>>))
      );
  }

  public queryList(param: Codec): Observable<RestResponse<Array<Codec>>> {
    return this.http.post<RestResponse<Array<Codec>>>(this.QUERY_LIST_URL, param)
      .pipe(
        catchError(this.handlerError('query list error.', {data: []} as RestResponse<Array<Codec>>))
      );
  }
}
