import { Component, OnInit } from '@angular/core';
import {RestResponse} from "../../core/core";
import {Page, PageDataComponent} from "../../core/page/pager";
import {ToastService} from "../../share/toast/toast.service";
import {Codec, CodeCService} from "./codec.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-codec',
  templateUrl: './codec.component.html',
  styleUrls: ['./codec.component.css']
})
export class CodeCComponent extends PageDataComponent<Codec> implements OnInit {
  private param: Codec = {};

  constructor(private codeCService: CodeCService, private toast: ToastService,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.queryPage();
  }

  protected queryPage(reset: boolean = false) {
    if (reset)
      this.pageParameter.pageIndex = 0;
    this.codeCService.queryPage(this.pageParameter, this.param).subscribe(
      (response: RestResponse<Page<Codec>>) => {
        if (response.status === 200) {
          this.page = response.data;
        } else {
          this.toast.error(response.message);
        }
      }
    );
  }

  private create() {
    this.router.navigate(['authSystem/codec/edit'], {queryParams: {title: '新增'}});
  }

  private modify() {
    if ( this.numberOfChecked !== 1) {
      this.toast.warning('请选择一条记录.');
      return false;
    }
    const selected = this.page.content.filter(item => this.mapOfCheckedId[item.id]);
    this.router.navigate(['authSystem/codec/edit'], {queryParams: {title: '修改', id: selected[0].id} });
  }
}
