import {Component, OnInit} from '@angular/core';
import {User} from '../../user/user';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.less'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  private hasLogin: boolean;
  private userInfo: User;
  public iconUrl = '';

  constructor() {}

  ngOnInit(): void {
    // todo get the iconUrl form system
  }
}
