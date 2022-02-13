import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-siderbar",
  templateUrl: "./admin-siderbar.component.html",
  styleUrls: ["./admin-siderbar.component.scss"],
})
export class AdminSiderbarComponent implements OnInit {
  routerUrl: string = this.router.url;
  constructor(public router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    console.log(this.router.url);
    this.routerUrl = this.router.url;
  }

  logout() {
    localStorage.removeItem("admintoken");
    this.router.navigate(["/admin/login"]);
  }
}
