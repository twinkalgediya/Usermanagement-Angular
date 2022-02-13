import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSortColumnComponent } from './table-sort-column.component';

describe('TableSortColumnComponent', () => {
  let component: TableSortColumnComponent;
  let fixture: ComponentFixture<TableSortColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSortColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSortColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
