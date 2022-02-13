import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FrontConstants } from 'src/app/core/constants/frontside.constants';
import { UserAuthService } from 'src/app/core/service/user-api/user-auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  //#region  DECLARE VARIABLES
  public loginForm!: FormGroup;
  public submitted: boolean = false;
  public isLoading: boolean = false;
  //#endregion

  constructor(
    public fb: FormBuilder,
    public userAuthService: UserAuthService,
    public router: Router,
    public alertService: ToastrService
    ) {}

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.userAuthService.login(this.loginForm.value).subscribe((data:any) => {
      this.alertService.success(FrontConstants.USER_LOGIN_SUCCESS);
      this.router.navigate(['/welcome']);
    }, (error:any) => {
      // this.alertService.error(FrontConstants.USER_LOGIN_FAIL);
      this.isLoading = false;
    });
  }
}
