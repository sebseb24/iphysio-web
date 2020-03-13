import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockPatientComponent } from './mock-patient.component';

describe('MockPatientComponent', () => {
  let component: MockPatientComponent;
  let fixture: ComponentFixture<MockPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
