import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvIvanComponent } from './inv-ivan.component';

describe('InvIvanComponent', () => {
  let component: InvIvanComponent;
  let fixture: ComponentFixture<InvIvanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvIvanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvIvanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
