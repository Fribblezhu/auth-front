import {Injectable} from "@angular/core";
import {HandleError, HttpErrorHandler} from "../../core/handler/http-error-handler";
import {AppConfigService} from "../../app.config";
import {HttpClient} from "@angular/common/http";
import {Role} from "./role";
import {Observable} from "rxjs/internal/Observable";
import {RestResponse} from "../../core/core";
import {getEmptyPage, Page, PageParameter} from "../../core/page/pager";
import {catchError} from "rxjs/operators";

@Injectable()
export class RoleService {
  private readonly GET_ROLE_PAGE_URL = this.appConfig.apiUrl + '/role/query-page';
  private readonly handleError: HandleError;

  constructor(private http: HttpClient, private appConfig: AppConfigService,
              private errorHandler: HttpErrorHandler) {
    this.handleError = this.errorHandler.createHandleError('role-service');
  }

  public queryPage(pageParameter: PageParameter, model: Role): Observable<RestResponse<Page<Role>>> {
    return this.http.post<RestResponse<Page<Role>>>( this.GET_ROLE_PAGE_URL, {pageParameter, model})
      .pipe(
        catchError(this.handleError('get role page data', {data: getEmptyPage()} as RestResponse<Page<Role>>))
      );
  }
}
