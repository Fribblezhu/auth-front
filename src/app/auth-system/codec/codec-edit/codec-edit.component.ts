import { Component, OnInit } from '@angular/core';
import {RestResponse} from "../../../core/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../share/toast/toast.service";
import {NzModalService} from "ng-zorro-antd";
import {Codec, CodeCService} from "../codec.service";

@Component({
  selector: 'app-codec-edit',
  templateUrl: './codec-edit.component.html',
  styleUrls: ['./codec-edit.component.css']
})
export class CodecEditComponent implements OnInit {

  private form: FormGroup;
  private currentCode: Codec = {};
  private isVisible;
  private title: string;
  private isLoading = true;
  private isSubmitLoading = false;

  constructor(private codeCService: CodeCService, private toast: ToastService,
              private fb: FormBuilder, private routerInfo: ActivatedRoute,
              private router: Router, private modalService: NzModalService ) { }

  ngOnInit() {
    this.title = this.routerInfo.snapshot.queryParams['title'];
    this.currentCode.id = this.routerInfo.snapshot.queryParams['id'];
    if (this.currentCode.id) {
      this.codeCService.get(this.currentCode.id).subscribe(
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
    this.form = this.fb.group({
      name: [this.currentCode.name, [Validators.required]],
      code: [this.currentCode.code, [Validators.required]],
      description: [this.currentCode.description],
    });
    this.isLoading = false;
  }
  private closeModal() {
    if (this.isSubmitLoading) {
      this.toast.warning('正在执行提交操作,请耐心等待.');
      return;
    }
    this.isVisible = false;
    this.router.navigate(['authSystem/codec']);
  }
  private submit() {
    if (this.form.valid) {
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
      this.codeCService.update(this.currentCode.id, this.currentCode).subscribe(
        (response) => {
          this.afterSaveOrUpdate(response);
        }
      );
    } else {
      this.codeCService.create(this.currentCode).subscribe(
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
