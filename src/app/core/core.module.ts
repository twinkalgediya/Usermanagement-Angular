import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout-parts/user/header/header.component';
import { FooterComponent } from './layout-parts/user/footer/footer.component';
import { AdminHeaderComponent } from './layout-parts/admin/admin-header/admin-header.component';
import { AdminFooterComponent } from './layout-parts/admin/admin-footer/admin-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminSiderbarComponent } from './layout-parts/admin/admin-siderbar/admin-siderbar.component';
import { ResizableModule } from 'angular-resizable-element';
import { TableSortColumnComponent } from './componenets/table-sort-column/table-sort-column.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminSiderbarComponent,
    TableSortColumnComponent,
  ],

  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    ResizableModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    TableSortColumnComponent,
    AdminSiderbarComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ResizableModule,
    TableSortColumnComponent,
    ToastrModule,
  ],
})
export class CoreModule {}
