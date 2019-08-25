import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {tokenNotExpired} from '../auth/auth.service';

/**
 * @author: zhu.wenjian
 * @date: 3/11/19
 * @description:
 */


@Injectable()
export class MemberGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return tokenNotExpired();
  }
}
