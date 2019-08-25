import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../core/auth/auth.service';
import {ToastService} from '../share/toast/toast.service';
import {RestResponse} from '../core/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  public handing = false;

  public loginForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      orgId: '10000',
      rememberMe: true,
    });
  }
  public focus() {
    this.handing = true;
  }
  public blur() {
    this.handing = false;
  }
  public login() {
    const user = this.loginForm.value;
    if (!this.loginForm.valid) {
      if (user.username === '' || user.password === '') {
        this.toastService.error('用户名或密码不能为空');
      } else {
        this.toastService.error('密码必须超过６位');
      }
      return;
    }
    this.authService.login(user).subscribe(
      (res: RestResponse<any>) => {
          if (res.data)
              this.router.navigate(['/authSystem/index']);
          else
            this.toastService.error('用户不存在或密码错误!');
      }
    );
  }
}
