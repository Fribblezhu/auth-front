import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {Menu, MenuService} from "./menu.service";
import {ToastService} from "../../share/toast/toast.service";
import {MenuEventService} from "./menu-event.service";

@Component({
    selector: 'app-menu',
    styleUrls: ['./menu.component.less'],
    templateUrl: './menu.component.html',
    animations: [
      trigger('openClose', [
        // ...
        state('open', style({
          opacity: 1,
        })),
        state('closed', style({
          display: 'none',
          opacity: 0.5,
        })),
        transition('open => closed', [
          animate('0s')
        ]),
        transition('closed => open', [
          animate('1s')
        ]),
      ]),
    ],
})
export class MenuComponent implements OnInit {
  private readonly topic = 'menu';
  // 资源池编号
  private readonly poolId = 'index-menu';
  // 是否显示二级菜单
  private isSecondMenuOpen: boolean;
  // 一级菜单
  private firstMenuList: [Menu];
  // 二级菜单
  private secondMenu: [Menu];
  constructor (private router: Router, private menuService: MenuService,
               private toastService: ToastService, private menuEventService: MenuEventService) {}
  ngOnInit(): void {
    this.isSecondMenuOpen = false;
    // 获取菜单栏
    this.menuService.getAuthSystemIndexMenu(this.poolId)
      .subscribe(
        (result) => {
          if (result.code !== 'error') {
            this.firstMenuList = result.data;
          } else {
            this.toastService.error(result.message);
          }
        }
      );
    // 监听二级菜单
    this.menuEventService.getEvent().subscribe(event => {
      if (event.topic === this.topic) {
        this.secondMenu = event.value;
      }
    });
  }

  public goSecondMenu(path: string) {
    this.isSecondMenuOpen = true;
    this.router.navigate([path]);
  }
  public goFirstMenu() {
    this.isSecondMenuOpen = false;
  }
}
