import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Code} from "../code";
import {CodeService} from "../code.service";
import {ToastService} from "../../../share/toast/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {RestResponse} from "../../../core/core";

@Component({
  selector: 'app-code-edit',
  templateUrl: './code-edit.component.html',
  styleUrls: ['./code-edit.component.css']
})
export class CodeEditComponent implements OnInit {
  private codeForm: FormGroup;
  private currentCode: Code = {};
  private isVisible;
  private title: string;
  private isLoading = true;
  private isSubmitLoading = false;

  constructor(private codeService: CodeService, private toast: ToastService,
              private fb: FormBuilder, private routerInfo: ActivatedRoute,
              private router: Router, private modalService: NzModalService ) { }

  ngOnInit() {
    this.title = this.routerInfo.snapshot.queryParams['title'];
    this.currentCode.id = this.routerInfo.snapshot.queryParams['id'];
    if (this.currentCode.id) {
      this.codeService.getCode(this.currentCode.id).subscribe(
        (response) => {
          if (response.data) {
            this.currentCode = response.data;
            this.initForm();
          } else {
            this.toast.error(response.message);
          }
        }
      );
    } else {
      this.initForm();
    }
    this.isVisible = true;
  }

  private initForm() {
    this.isLoading = true;
    this.codeForm = this.fb.group({
      name: [this.currentCode.name, [Validators.required]],
      code: [this.currentCode.code, [Validators.required]],
      comment: [this.currentCode.comment],
    });
    this.isLoading = false;
  }
  private closeModal() {
    if (this.isSubmitLoading) {
      this.toast.warning('正在执行提交操作,请耐心等待.');
      return;
    }
    this.isVisible = false;
    this.router.navigate(['authSystem/code']);
  }
  private submit() {
    if (this.codeForm.valid) {
      this.modalService.confirm({
        nzTitle: '提示',
        nzContent: '您正在执行提交操作,请确认.',
        nzOnOk: () => {
          this.saveOrUpdate();
        }
      });
    } else {
      this.toast.error('请完善表单信息，并按规则填写.');
    }
  }
  private saveOrUpdate() {
    this.isSubmitLoading = true;
    if (this.currentCode.id) {
      this.codeService.update(this.currentCode.id, this.currentCode).subscribe(
        (response) => {
          this.afterSaveOrUpdate(response);
        }
      );
    } else {
      this.codeService.create(this.currentCode).subscribe(
        (response) => {
          this.afterSaveOrUpdate(response);
        }
      );
    }
  }
  private afterSaveOrUpdate(response: RestResponse<any>) {
    this.isSubmitLoading = false;
    if (response.status === 200) {
      this.toast.success('新增成功.');
      this.closeModal();
    } else {
      this.toast.error(response.message);
    }
  }
}
