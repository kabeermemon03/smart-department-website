import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZoneChangeDetection } from '@angular/core';

import { GpaComponent } from './gpa';

describe('GpaComponent', () => {
  let component: GpaComponent;
  let fixture: ComponentFixture<GpaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GpaComponent],
      providers: [provideZoneChangeDetection({ eventCoalescing: true })]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
