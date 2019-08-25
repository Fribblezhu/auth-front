import { Component, OnInit } from '@angular/core';
import {Member} from './member';
import {Page, PageDataComponent} from '../../core/page/pager';
import {MemberService} from './member.service';
import {RestResponse} from '../../core/core';
import {ToastService} from '../../share/toast/toast.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent extends PageDataComponent<Member> implements OnInit {
  private param: Member;

  constructor(private service: MemberService, private toastService: ToastService,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.queryPage();
  }

  protected queryPage(reset: boolean = false) {
    if (reset)
      this.pageParameter.pageIndex = 0;
    this.loading = true;
    this.service.queryPage(this.pageParameter, this.param).subscribe(
      (res: RestResponse<Page<Member>>) => {
        if (res.status === 200) {
          this.page = res.data;
        } else {
          this.toastService.error(res.message);
        }
        this.loading = false;
      });
  }

  private create() {
    this.router.navigate(['authSystem/member/edit'], {queryParams: {title: '新增'}});
  }

  private delete() {
    // todo
  }

  private modify() {
    if ( this.numberOfChecked !== 1) {
      this.toastService.warning('请选择一条记录.');
      return false;
    }
    const selected = this.page.content.filter(item => this.mapOfCheckedId[item.id]);
    this.router.navigate(['authSystem/member/edit'], {queryParams: {title: '修改', id: selected[0].id} });
  }

  private freeze() {
    // todo
  }
}
