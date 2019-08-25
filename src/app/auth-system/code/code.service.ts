import { Injectable } from '@angular/core';
import {RestResponse} from '../../core/core';
import {Code} from './code';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../../app.config';
import {HandleError, HttpErrorHandler} from '../../core/handler/http-error-handler';
import {Observable} from 'rxjs/internal/Observable';
import {getEmptyPage, Page, PageParameter} from '../../core/page/pager';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  private readonly handlerError: HandleError;
  private readonly GET_URL = this.appConfig.apiUrl + '/code/';
  private readonly UPDATE_URL = this.appConfig.apiUrl + '/code/';
  private readonly CREATE_URL = this.appConfig.apiUrl + '/code/create';
  private readonly QUERY_PAGE_URL = this.appConfig.apiUrl + '/code/query-page';
  private readonly CLASSIFY_URL  = this.appConfig.apiUrl + '/code/classify/';

  constructor(private http: HttpClient, private appConfig: AppConfigService,
              private errorHandler: HttpErrorHandler) {
    this.handlerError = errorHandler.createHandleError('Code Service');
  }

  public queryPage(pageParameter: PageParameter, model: Code): Observable<RestResponse<Page<Code>>> {
    return this.http.post<RestResponse<Page<Code>>>(this.QUERY_PAGE_URL, {pageParameter, model})
      .pipe(
        catchError(this.handlerError( 'query page error.', {data: getEmptyPage()} as RestResponse<Page<Code>>))
      );
  }

  public getCode(id: string): Observable<RestResponse<Code>> {
    return this.http.get<RestResponse<Code>>(this.GET_URL + id)
      .pipe(
        catchError(this.handlerError('get single error.', {data: null} as RestResponse<Code>))
      );
  }

  public update(id: string, code: Code): Observable<RestResponse<Code>> {
    return this.http.put<RestResponse<Code>>(this.UPDATE_URL + id, code)
      .pipe(
        catchError(this.handlerError('update single error.', {data: null} as RestResponse<Code>))
      );
  }

  public create(code: Code): Observable<RestResponse<Code>> {
    return this.http.post<RestResponse<Code>>(this.CREATE_URL, code)
      .pipe(
        catchError(this.handlerError('create single error.', {data: null} as RestResponse<Code>))
      );
  }

  public classify(id: string, selectedCodec: Array<string>): Observable<RestResponse<Code>> {
    return this.http.post<RestResponse<Code>>(this.CLASSIFY_URL + id, selectedCodec)
      .pipe(
        catchError(this.handlerError('classify error.', {data: null} as RestResponse<Code>))
      );
  }
}

