import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../../app.config';
import {Member} from './member';
import {Observable} from 'rxjs/internal/Observable';
import {RestResponse} from '../../core/core';
import {getEmptyPage, Page, PageParameter} from '../../core/page/pager';
import {catchError} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '../../core/handler/http-error-handler';

@Injectable()
export class MemberService {

  private readonly GET_MEMBER_PAGE_URL = this.appConfig.apiUrl + '/user/query-page';
  private readonly GET_MEMBER_URL = this.appConfig.apiUrl + '/user/';
  private readonly QUERY_MEMBER_URL = this.appConfig.apiUrl + '/user/query-list';
  private readonly UPDATE_MEMBER_URL = this.appConfig.apiUrl + '/user/';
  private readonly handleError: HandleError;

  constructor(private http: HttpClient, private appConfig: AppConfigService,
              private errorHandler: HttpErrorHandler) {
    this.handleError = this.errorHandler.createHandleError('MemberService');
  }

  public queryPage(pageParameter: PageParameter, model: Member): Observable<RestResponse<Page<Member>>> {
    return this.http.post<RestResponse<Page<Member>>>( this.GET_MEMBER_PAGE_URL, {pageParameter, model})
      .pipe(
        catchError(this.handleError('query member page data error.', {data: getEmptyPage()} as RestResponse<Page<Member>>))
      );
  }

  public getMember(id: String): Observable<RestResponse<Member>> {
    return this.http.get<RestResponse<Member>>(this.GET_MEMBER_URL + id)
      .pipe(
        catchError(this.handleError('query member list data error.', {data : null} as RestResponse<Member>))
      );
  }


  public queryMember(member: Member): Observable<RestResponse<[Member]>> {
    return this.http.post<RestResponse<[Member]>>(this.QUERY_MEMBER_URL, member)
      .pipe(
        catchError(this.handleError('query member list data error.', {data : null} as RestResponse<[Member]>))
      );
  }

  public updateMember(member: Member): Observable<RestResponse<Member>> {
    return this.http.put<RestResponse<Member>>(this.UPDATE_MEMBER_URL, member)
      .pipe(
        catchError(this.handleError('update member error.', {data: null} as RestResponse<Member>))
      );
  }
}
