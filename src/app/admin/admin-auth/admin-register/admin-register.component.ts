import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/core/service/admin-api/admin/admin-auth.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss'],
})
export class AdminRegisterComponent implements OnInit {
  //#region  DECLARE VARIABLES
  public registrationForm!: FormGroup;
  public submitted: boolean = false;
  public isLoading: boolean = false;
  //#endregion
  constructor(public fb: FormBuilder, public router: Router, public adminAuth: AdminAuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log('this.registrationForm: ', this.registrationForm);
    if (this.registrationForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.adminAuth.register(this.registrationForm.value).subscribe(
      (data: any) => {
        console.log('data: ', data);
        this.router.navigate(['/users']);
      },
      (error: any) => {
        console.log('error: ', error);
      }
    );
  }
}
