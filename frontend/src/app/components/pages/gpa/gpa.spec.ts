import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gpa } from './gpa';

describe('Gpa', () => {
  let component: Gpa;
  let fixture: ComponentFixture<Gpa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gpa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gpa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
