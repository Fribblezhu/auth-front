import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Member} from "../member";
import {MemberService} from "../member.service";
import {ToastService} from "../../../share/toast/toast.service";
import * as moment from 'moment';
import {NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  private memberForm: FormGroup;
  private currentMember: Member = {};
  private isVisible;
  private title: string;
  private isLoading = false;
  private isSubmitLoading = false;
  constructor(private fb: FormBuilder, private routerInfo: ActivatedRoute,
              private router: Router, private memberService: MemberService,
              private toastService: ToastService, private modalService: NzModalService) { }
  ngOnInit() {
    this.title = this.routerInfo.snapshot.queryParams['title'];
    this.currentMember.id = this.routerInfo.snapshot.queryParams['id'];
    if (this.currentMember.id) {
      this.isLoading = true;
      this.memberService.getMember(this.currentMember.id).subscribe(
        result => {
          if (result.data) {
            this.currentMember = result.data;
            this.initForm();
          } else {
            this.toastService.error(result.message);
          }
        }
      );
    } else {
      this.initForm();
    }
    this.isVisible = true;
  }
  private closeModal() {
    if (this.isSubmitLoading) {
      this.toastService.warning('正在执行提交操作,请耐心等待.');
      return;
    }
    this.isVisible = false;
    this.router.navigate(['authSystem/member']);
  }

  private initForm() {
    this.isLoading = true;
    this.memberForm = this.fb.group({
      loginName: [this.currentMember.loginName, [Validators.required]],
      username: [this.currentMember.username, [Validators.required]],
      email: [this.currentMember.email, [Validators.required]],
      telephone: [this.currentMember.telephone],
      mobile: [this.currentMember.mobile],
      gender: [this.currentMember.gender],
      birthDay: [this.currentMember.birthDay],
      age: [this.currentMember.age],
      abbreviation: [this.currentMember.abbreviation]
    });
    this.isLoading = false;
  }

  private birthDayOnChange(date: Date) {
    if (!date) {
      this.currentMember.age = null;
    } else {
      const now = new Date();
      this.currentMember.age = now.getFullYear() - date.getFullYear();
    }
  }

  private submit() {
    if (this.memberForm.valid) {
      this.modalService.confirm({
        nzTitle: '提示',
        nzContent: '您正在执行提交操作,请确认.',
        nzOnOk: () => {
          this.isSubmitLoading = true;
          this.memberService.updateMember(this.currentMember).subscribe(
            (result) => {
              this.isSubmitLoading  = false;
            }
          );
        }
      });
    } else {
      this.toastService.error('请完善表单信息，并按规则填写.');
    }
  }

}
