import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  userModel: any;
  constructor(private authService: AuthService,
    private router: Router,) { }

  ngOnInit(): void {
    this.userModel = this.authService.getUserProfile();
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
