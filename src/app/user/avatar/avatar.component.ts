import {Component, OnInit} from '@angular/core';
import {removeToken, tokenNotExpired} from '../../core/auth/auth.service';
import {User} from '../user';
import {Router} from '@angular/router';

@Component({
  selector: 'mine-avatar',
  styleUrls: ['./avatar.component.less'],
  templateUrl: './avatar.component.html'
})
export class AvatarComponent implements OnInit {
  public iconUrl = '';
  private hasLogin: boolean;
  private userInfo: User;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.hasLogin = tokenNotExpired();
    if (this.hasLogin) {
      // todo
    }
  }

  private login() {
    this.router.navigate(['login']);
  }

  private logout() {
    removeToken();
    this.hasLogin = false;
  }

  private directToBlog() {
    this.router.navigate(['blog']);
  }
}
