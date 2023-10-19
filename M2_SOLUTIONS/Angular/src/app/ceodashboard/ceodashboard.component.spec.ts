import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeodashboardComponent } from './ceodashboard.component';

describe('CeodashboardComponent', () => {
  let component: CeodashboardComponent;
  let fixture: ComponentFixture<CeodashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CeodashboardComponent]
    });
    fixture = TestBed.createComponent(CeodashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
