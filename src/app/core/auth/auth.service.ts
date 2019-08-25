import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../../app.config';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '../handler/http-error-handler';
import {Error} from 'tslint/lib/error';
import {RestResponse} from '../core';

/**
 * @author: zhu.wenjian
 * @date:
 * @description:
 */




// 权限校验服务
@Injectable()
export class AuthService {
  private event: AuthEvent;

  private readonly handleError: HandleError;

  constructor(private http: HttpClient, private appConfig: AppConfigService, private errorHandler: HttpErrorHandler) {
    this.handleError = this.errorHandler.createHandleError('AuthService');
  }

  public login(authInfo: {}): Observable<RestResponse<any>> {
    return this.http.post<RestResponse<any>>(this.appConfig.apiUrl + this.appConfig.LOGIN_URL, authInfo, {})
      .pipe(
          catchError(this.handleError('login', {} as RestResponse<any>)),
          tap(
            data => saveToken(data.data)
          )
        );
  }

  public getUser(): Observable<RestResponse<any>> {
    return this.http.get<RestResponse<any>>(this.appConfig.apiUrl + this.appConfig.GET_USER_URL, {})
      .pipe(
        catchError(this.handleError('getUser' , {} as RestResponse<any>)),
      );
  }

  public hasRole(): Observable<RestResponse<any>> {
    return this.http.get < RestResponse<any>>(this.appConfig.apiUrl + this.appConfig.HAS_ROLE, {})
      .pipe(
        catchError(this.handleError('hasRole', {} as RestResponse<any>))
      );
  }
}
export class Didlogin {}
export class Didlogout {}
export type AuthEvent = Didlogin | Didlogout;
export interface IAuthConfig {
  globalHeaders: Object[];
  headerName: string;
  headerPrefix: string;
  noJwtError: boolean;
  noClientCheck: boolean;
  noTokenScheme?: boolean;
  tokenGetter: () => string | Promise<string>;
  tokenName: string;
}
export interface IAuthConfigOptional {
  globalHeaders?: Object[];
  headerName?: string;
  headerPrefix?: string;
  noJwtError?: boolean;
  noClientCheck?: boolean;
  noTokenScheme?: boolean;
  tokenGetter?: () => string | Promise<string>;
  tokenName?: string;
}
export class AuthConfigConsts {
  public static DEFAULT_TOKEN_NAME = 'jwt';
  public static DEFAULT_HEADER_NAME = 'Authorization';
  public static HEADER_PREFIX_BEARER = 'Bearer ';
}
const AuthConfigDefaults: IAuthConfig = {
  headerName: AuthConfigConsts.DEFAULT_HEADER_NAME,
  headerPrefix: null,
  tokenName: AuthConfigConsts.DEFAULT_TOKEN_NAME,
  tokenGetter: () => localStorage.getItem(AuthConfigDefaults.tokenName) as string,
  noJwtError: false,
  noClientCheck: false,
  globalHeaders: [{ 'Access-Control-Allow-Origin': '*' },
    { 'Access-Control-Allow-Methods': 'OPTIONS,HEAD,GET,PUT,POST,DELETE,PATCH' }],
  noTokenScheme: false
};
export class AuthConfig {

  private readonly _config: IAuthConfig;

  constructor(config?: IAuthConfigOptional) {
    config = config || {};
    this._config = objectAssign({}, AuthConfigDefaults, config);
    if (this._config.headerPrefix) {
      this._config.headerPrefix += ' ';
    } else if (this._config.noTokenScheme) {
      this._config.headerPrefix = '';
    } else {
      this._config.headerPrefix = AuthConfigConsts.HEADER_PREFIX_BEARER;
    }

    if (config.tokenName && !config.tokenGetter) {
      this._config.tokenGetter = () => localStorage.getItem(config.tokenName) as string;
    }
  }

  public getConfig(): IAuthConfig {
    return this._config;
  }

}

export function tokenNotExpired(tokenName = AuthConfigConsts.DEFAULT_TOKEN_NAME, jwt?: string): boolean {

  const token: string = jwt || localStorage.getItem(tokenName);
  if (token == null)
    return false;
  const jwtHelper = new JwtHelper();
  let isExpired = false;
  try {
    isExpired = jwtHelper.isTokenExpired(token);
  } catch (e) {
    // ignore
  }
  return isExpired;
}

export function removeToken(tokenName = AuthConfigConsts.DEFAULT_TOKEN_NAME) {
  localStorage.removeItem(tokenName);
}

export function saveToken(jwt: string, tokenName = AuthConfigConsts.DEFAULT_TOKEN_NAME) {
  console.log(tokenNotExpired(tokenName, jwt));
  localStorage.setItem(tokenName, jwt);
}

export function getToken(tokenName = AuthConfigConsts.DEFAULT_TOKEN_NAME) {
  return localStorage.getItem(tokenName);
}

export class JwtHelper {

  public urlBase64Decode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: { break; }
      case 2: { output += '=='; break; }
      case 3: { output += '='; break; }
      default: {
        throw new Error('Illegal base64url string!');
      }
    }
    return this.b64DecodeUnicode(output);
  }

  // credits for decoder goes to https://github.com/atk
  private b64decode(str: string): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';

    str = String(str).replace(/=+$/, '');

    if (str.length % 4 === 1) {
      throw new Error('\'atob\' failed: The string to be decoded is not correctly encoded.');
    }

    for (
      // initialize result and counters
      let bc = 0, bs: any, buffer: any, idx = 0;
      // get next character
      buffer = str.charAt(idx++);
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode( 255 & bs >> (-2 * bc & 6)) : 0) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  }

  // https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  private b64DecodeUnicode(str: any) {
    return decodeURIComponent(Array.prototype.map.call(this.b64decode(str), (c: any) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  public decodeToken(token: string): any {
    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }

    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }
    return JSON.parse(decoded);
  }

  public getTokenExpirationDate(token: string): Date {
    let decoded: any;
    decoded = this.decodeToken(token);
    console.log('decode:' + decoded);
    if (!decoded.hasOwnProperty('exp')) {
      return null;
    }

    const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  public isTokenExpired(token: string, offsetSeconds?: number): boolean {
    const date = this.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;

    if (date == null) {
      return false;
    }

    // Token expired?
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
  }
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
const propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val: any) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}
function objectAssign(target: any, ...source: any[]) {
  let from: any;
  const to = toObject(target);
  let symbols: any;

  for (let s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (const key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if ((<any>Object).getOwnPropertySymbols) {
      symbols = (<any>Object).getOwnPropertySymbols(from);
      for (let i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }
  return to;
}






