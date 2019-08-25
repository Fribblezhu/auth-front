import { Component, OnInit } from '@angular/core';
import {Page, PageDataComponent} from "../../core/page/pager";
import {RestResponse} from "../../core/core";
import {ToastService} from "../../share/toast/toast.service";
import {Role} from "./role";
import {RoleService} from "./role.service";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent extends PageDataComponent<Role> implements OnInit {
  private param: Role;
  constructor(private service: RoleService, private toastService: ToastService) {
    super();
  }

  ngOnInit() {
    this.queryPage();
  }

  protected queryPage(reset: boolean = false) {
    if (reset)
      this.pageParameter.pageIndex = 1;
    this.loading = true;
    this.service.queryPage(this.pageParameter, this.param).subscribe(
      (res: RestResponse<Page<Role>>) => {
        if (res.status === 200) {
          this.page = res.data;
        } else {
          this.toastService.error(res.message);
        }
        this.loading = false;
      });
  }
  private create() {
    // todo
  }

  private delete() {
    // todo
  }

  private modify() {
    // todo
  }

  private freeze() {
    // todo
  }

}
