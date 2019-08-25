import { Component, OnInit } from '@angular/core';
import {PageDataComponent} from "../../core/page/pager";
import {System} from "./system";
import {Router} from "@angular/router";
import {ToastService} from "../../share/toast/toast.service";
import {SystemService} from "./system.service";

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent extends PageDataComponent<System> implements OnInit {
  // 当前选中的系统
  private currentSystemId: string;
  private param: System;

  constructor(private systemService: SystemService, private toast: ToastService,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.queryPage();
  }
  protected queryPage(reset: boolean = false) {
    if (reset) {
      this.pageParameter.pageIndex = 1;
    }
    this.systemService.queryPage(this.pageParameter, this.param)
      .subscribe(response => {
        if (response.status === 200) {
          this.page = response.data;
        } else {
          this.toast.error(response.message);
        }
      });
  }

}
