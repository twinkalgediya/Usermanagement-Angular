import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminConstants } from 'src/app/core/constants/admin.constants';
import { UserService } from 'src/app/core/service/admin-api/user/user.service';

@Component({
  selector: 'app-admin-user-create',
  templateUrl: './admin-user-create.component.html',
  styleUrls: ['./admin-user-create.component.scss'],
})
export class AdminUserCreateComponent implements OnInit {
  //#region  DECLARE VARIABLES
  public registrationForm!: FormGroup;
  public submitted: boolean = false;
  public isLoading: boolean = false;
  //#endregionor() { }

  constructor(
    public fb: FormBuilder,
    public userService: UserService,
    public router: Router,
    public alertService: ToastrService,
    public activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.activeRouter.params.subscribe((params) => {
      console.log(params);
    })
  }

  get f(){
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      profile_picture: new FormControl('', []),
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.userService.saveUser(this.registrationForm.value).subscribe(
      (data) => {
        this.alertService.success(AdminConstants.USER_ADDED_SUCCESS); 
        this.router.navigate(['/admin/users']);
      },
      (error: any) => {
        console.log('error: ', error);
      }
    );
  }
}
