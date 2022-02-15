import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AdminConstants } from "src/app/core/constants/admin.constants";
import { RequestParamModel } from "src/app/core/model/requestParamModel.model";
import { UserService } from "src/app/core/service/admin-api/user/user.service";

@Component({
  selector: "app-admin-user-create",
  templateUrl: "./admin-user-create.component.html",
  styleUrls: ["./admin-user-create.component.scss"],
})
export class AdminUserCreateComponent implements OnInit {
  //#region  DECLARE VARIABLES
  public registrationForm!: FormGroup;
  public submitted: boolean = false;
  public isLoading: boolean = false;
  public userModel: any;
  public userId: any;
  //#endregionor() { }

  constructor(
    public fb: FormBuilder,
    public userService: UserService,
    public router: Router,
    public alertService: ToastrService,
    public activeRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params) => {
      this.userId = params.id ? params.id : '';
      this.initForm();
      if (params.id) {
        this.userService
          .getUserAllData(params.id, new RequestParamModel())
          .subscribe((data) => {
            this.userModel = data;
            console.log("data: ", data);
            this.registrationForm.patchValue(data);
            if (this.userModel.strength.length > 1) {
              const length = this.userModel.strength.length - 1;
              for (let i = 0; i < length; i++) {
                this.strength.push(this.createStrength());
                this.strength.controls[i + 1].patchValue({
                  name: this.userModel.strength[i + 1].name,
                });
              }
            }
          });
      } else {
        this.initForm();
      }
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    if (!this.userId) {
      this.registrationForm = this.fb.group({
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required]),
        name: new FormControl("", [Validators.required]),
        mobile: new FormControl("", [Validators.required]),
        gender: new FormControl("", [Validators.required]),
        strength: this.fb.array([this.createStrength()]),
      });
    } else {
      this.registrationForm = this.fb.group({
        email: new FormControl("", [Validators.required, Validators.email]),
        name: new FormControl("", [Validators.required]),
        mobile: new FormControl("", [Validators.required]),
        gender: new FormControl("", [Validators.required]),
        strength: this.fb.array([this.createStrength()]),
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.registrationForm.invalid);
    if (this.registrationForm.invalid) {
      return;
    }
    this.isLoading = true;
    let json = {
      ...this.registrationForm.value,
    };
    if (this.userModel) {
      json._id = this.userModel._id;
    }
    this.userService.saveUser(json).subscribe(
      (data) => {
        if (this.userModel) {
          this.alertService.success(AdminConstants.USER_EDIT_SUCCESS);
        } else {
          this.alertService.success(AdminConstants.USER_ADDED_SUCCESS);
        }

        this.router.navigate(["/admin/users"]);
      },
      (error: any) => {
        console.log("error: ", error);
      }
    );
  }

  get strength(): FormArray {
    return <FormArray>this.registrationForm.get("strength");
  }
  createStrength(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
    });
  }

  addStrngth() {
    this.strength.push(this.createStrength());
  }

  OnRemove(index: number) {
    this.strength.removeAt(index);
  }
}
