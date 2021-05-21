import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberColumnsComponent } from './member-columns.component';

describe('MemberColumnsComponent', () => {
  let component: MemberColumnsComponent;
  let fixture: ComponentFixture<MemberColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberColumnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
