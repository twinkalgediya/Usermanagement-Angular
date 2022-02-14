import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FrontConstants } from 'src/app/core/constants/frontside.constants';
import { UserAuthService } from 'src/app/core/service/user-api/user-auth.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { UserModel } from 'src/app/core/model/user.model';
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
  public errorMessage: any;
  //#endregion

  constructor(
    public fb: FormBuilder,
    public userAuthService: UserAuthService,
    public router: Router,
    public alertService: ToastrService,
    private socialAuthService: SocialAuthService,
  ) { }

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
    this.userAuthService.login(this.loginForm.value).subscribe((data: any) => {
      this.alertService.success(FrontConstants.USER_LOGIN_SUCCESS);
      this.router.navigate(['/welcome']);
    }, (error: any) => {
      // this.alertService.error(FrontConstants.USER_LOGIN_FAIL);
      this.isLoading = false;
    });
  }
  fbLogin() {
    const fbLoginOptions = {
      scope: 'public_profile,email'
    };
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID, fbLoginOptions).then(
      (userData) => {
        console.log(userData);
        let loginModelFB = userData;
        this.userAuthService.loginWithFacebook(loginModelFB).subscribe((sessionModel: any) => {
          if (sessionModel.token !== undefined) {
            localStorage.setItem("token", sessionModel.token);
            localStorage.setItem("user", JSON.stringify(sessionModel));
            this.router.navigate(['/welcome']);
          }
        }, (error: any) => {
          if (error.status == 422) {
            this.alertService.error(error, 'Error');
          } else if (error.status == 401) {
            this.errorMessage = error.error.data.message;
            this.alertService.error(this.errorMessage, 'Error');
          }
        });
      }).catch((error: any) => {

      });
  }
  googleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      let loginModelGL = userData;
      this.userAuthService.loginWithGoogle(loginModelGL).subscribe((sessionModel: any) => {
        console.log(sessionModel);
        if (sessionModel.token !== undefined) {
          localStorage.setItem("token", sessionModel.token);
          localStorage.setItem("user", JSON.stringify(sessionModel));
          this.router.navigate(['/welcome']);
          this.alertService.success(FrontConstants.USER_LOGIN_SUCCESS);
          this.submitted = false;
          this.loginForm.reset();
        }
      }, (error: any) => {
        if (error.status == 422) {
          this.alertService.error(error, 'Error');
        } else if (error.status == 401) {
          this.errorMessage = error.error.data.message;
          this.alertService.error(this.errorMessage, 'Error');
        }
      });
    }).catch((error: any) => {
    });;

  }
}
