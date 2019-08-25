import { Component, OnInit } from '@angular/core';
import {PageDataComponent} from "../../core/page/pager";
import {Code} from "./code";
import {CodeService} from "./code.service";
import {ToastService} from "../../share/toast/toast.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent extends PageDataComponent<Code> implements OnInit  {
  private param: Code = {};

  constructor(private codeService: CodeService, private toast: ToastService,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.queryPage();
  }

  protected queryPage(reset: boolean = false) {
    if (reset)
      this.pageParameter.pageIndex = 1;
    this.codeService.queryPage(this.pageParameter, this.param).subscribe(
      (response) => {
        if (response.status === 200) {
          this.page = response.data;
        } else {
          this.toast.error(response.message);
        }
      }
    );
  }
  private create() {
    this.router.navigate(['authSystem/code/edit'], {queryParams: {title: '新增'}});
  }

  private modify() {
    if (this.isSelectSingle()) {
      const selected = this.page.content.filter(item => this.mapOfCheckedId[item.id]);
      this.router.navigate(['authSystem/code/edit'], {queryParams: {title: '修改', id: selected[0].id} });
    }
  }
  private classify() {
    if (this.isSelectSingle()) {
      const selected = this.page.content.filter(item => this.mapOfCheckedId[item.id]);
      this.router.navigate(['authSystem/code/classify'], {queryParams: {title: '归类', id: selected[0].id} });
    }
  }
  private isSelectSingle(): boolean {
    if ( this.numberOfChecked !== 1) {
      this.toast.warning('请选择一条记录.');
      return false;
    }
    return true;
  }
}
