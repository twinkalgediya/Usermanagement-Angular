import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AdminAuthService } from "src/app/core/service/admin-api/admin/admin-auth.service";

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
  constructor(public fb: FormBuilder, public adminAuth: AdminAuthService,public router:Router) {}

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
    this.adminAuth.login(this.loginForm.value).subscribe((data: any) => {
    this.router.navigate(['/admin/users']);
    },(error:any)=>{
      console.log(error);
    });
  }
}
