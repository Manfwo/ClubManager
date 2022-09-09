import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberParentComponent } from './member-parent.component';

describe('MemberParentComponent', () => {
  let component: MemberParentComponent;
  let fixture: ComponentFixture<MemberParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
