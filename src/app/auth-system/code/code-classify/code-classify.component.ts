import { Component, OnInit } from '@angular/core';
import {Code} from "../code";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CodeService} from "../code.service";
import {NzModalService} from "ng-zorro-antd";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../../../share/toast/toast.service";
import {Codec, CodeCService} from "../../codec/codec.service";

@Component({
  selector: 'app-code-classify',
  templateUrl: './code-classify.component.html',
  styleUrls: ['./code-classify.component.css']
})
export class CodeClassifyComponent implements OnInit {

  private form: FormGroup;
  private currentCode: Code = {};
  private codec: Array<Codec> = [];
  private isVisible;
  private title: string;
  private isLoading = true;
  private isSubmitLoading = false;
  private listOfSelected = [];
  constructor(private codeService: CodeService, private toast: ToastService,
              private fb: FormBuilder, private routerInfo: ActivatedRoute,
              private router: Router, private modalService: NzModalService,
              private codeCService: CodeCService) {
  }

  ngOnInit() {
    this.title = this.routerInfo.snapshot.queryParams['title'];
    this.currentCode.id = this.routerInfo.snapshot.queryParams['id'];
    this.codeService.getCode(this.currentCode.id).subscribe(
      (response) => {
        if (response.data) {
          this.currentCode = response.data;
          this.currentCode.codecList.forEach(c => {
            this.listOfSelected.push(c.value);
          });
          this.initForm();
        } else {
          this.toast.error(response.message);
          this.closeModal();
        }
      }
    );
  }
  private initForm() {
    this.isLoading = true;
    this.form = this.fb.group({
      codecId: [this.listOfSelected]
    });
    this.isVisible = true;
    this.codeCService.queryList({}).subscribe(
      (response) => {
        if (response.status === 200) {
          this.codec = response.data;
          this.isLoading = false;
        } else {
          this.toast.error(response.message);
          this.closeModal();
        }
      }
    );
    this.isLoading = false;
  }
  private submit() {
    if (this.form.valid) {
      this.modalService.confirm({
        nzTitle: '提示',
        nzContent: '您正在执行提交操作,请确认.',
        nzOnOk: () => {
          this.save();
        }
      });
    } else {
      this.toast.error('请完善表单信息，并按规则填写.');
    }
  }
  private save() {
    this.codeService.classify(this.currentCode.id, this.listOfSelected).subscribe(
      response => {
        if (response.status === 200) {
          this.toast.success('归类成功.');
          this.closeModal();
        }  else {
          this.toast.error(response.message);
        }
      }
    );
  }
  private closeModal() {
    if (this.isSubmitLoading) {
      this.toast.warning('正在执行提交操作,请耐心等待.');
      return;
    }
    this.isVisible = false;
    this.router.navigate(['authSystem/code']);
  }


}
