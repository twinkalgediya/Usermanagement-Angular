import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  routerUrl: string = this.router.url;
  constructor(public router: Router) { }

  ngOnInit(): void {
    this.routerUrl = this.router.url;
  }
  logout() {
    localStorage.removeItem("admintoken");
    this.router.navigate(["/admin/login"]);
  }
}
