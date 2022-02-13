import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminAuthService } from 'src/app/core/service/admin-api/admin/admin-auth.service';
import { AuthService } from 'src/app/core/service/auth/auth.service';

@Component({
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.scss"],
})
export class AdminLoginComponent implements OnInit {
  //#region  DECLARE VARIABLES
  public loginForm!: FormGroup;
  public submitted: boolean = false;
  public isLoading: boolean = false;
  //#endregion
  constructor(public fb: FormBuilder, public adminAuth: AdminAuthService, public alertService: ToastrService, public router: Router,
    public adminAuthService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    var loginModel = {
      email: this.f.email.value,
      password: this.f.password.value,
    }
    this.adminAuth.login(this.loginForm.value).subscribe(
      (sessionModel: any) => {
        console.log(sessionModel);
        if (sessionModel.token !== undefined) {
          this.adminAuthService.clearToken();
          localStorage.setItem("admintoken", sessionModel.token);
          this.adminAuthService.setAdminDetail(sessionModel);
          this.adminAuthService._profileModel.next(sessionModel);
          this.router.navigate(['/admin/users']);
        }
      }, (error: any) => {
        if (error.status == 422) {
          this.alertService.error(error, 'Error');
        } else if (error.status == 401) {
        }
        this.isLoading = false;
        this.router.navigate(['/admin/login']);
      });
  }
}
