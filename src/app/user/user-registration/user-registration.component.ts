import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FrontConstants } from "src/app/core/constants/frontside.constants";
import { UserAuthService } from "src/app/core/service/user-api/user-auth.service";

@Component({
  selector: "app-user-registration",
  templateUrl: "./user-registration.component.html",
  styleUrls: ["./user-registration.component.scss"],
})
export class UserRegistrationComponent implements OnInit {
  //#region  DECLARE VARIABLES
  public registrationForm!: FormGroup;
  public submitted: boolean = false;
  public isLoading: boolean = false;
  // public files: any;
  // imageError: string = "";
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
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      mobile: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      // profile_picture: new FormControl("", []),
      strength: this.fb.array([this.createStrength()]),
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log("this.registrationForm: ", this.registrationForm);
    if (this.registrationForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.userAuthService.register(this.registrationForm.value).subscribe(
      (data: any) => {
        this.alertService.success(FrontConstants.USER_REGISTER_SUCCESS);
        this.router.navigate(["/login"]);
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

  handleFileInput(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const files = <File>event.target.files[0];
      const validFileExtention = ["jpg", "png", "jpeg"];
      const filearray = files.name.split(".");
      if (
        validFileExtention.indexOf(
          filearray[filearray.length - 1].toLowerCase()
        ) > -1
      ) {
        reader.readAsDataURL(files);
        // this.files = <File>event.target.files[0];
        // reader.onload = (e: any) => {
        //   const image = new Image();
        //   image.src = e.target.result;
        //   image.onload = (rs) => {
        //     const img_height = rs?.currentTarget["height"];
        //     const img_width = rs.currentTarget["width"];
        //     console.log("img_width: ", img_height, img_width);

        //     if (img_width <= 5000 && img_height <= 5000) {
        //       this.files = <File>event.target.files[0];
        //       this.advertisementModel.banner_image = reader.result;
        //       this.is_file_change = true;
        //       this.changeDetection.markForCheck();
        //     } else {
        //       this.advertisementForm.controls.banner_image.reset();
        //       this.imageError = "File size must be valid";
        //     }
        //   };
        // };
      } else {
        this.registrationForm.controls.profile_picture.reset();
        // this.imageError = "File type must be jpg or png";
      }
    }
  }
}
