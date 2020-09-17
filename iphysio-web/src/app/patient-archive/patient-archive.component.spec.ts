import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientArchiveComponent } from './patient-archive.component';

describe('PatientArchiveComponent', () => {
  let component: PatientArchiveComponent;
  let fixture: ComponentFixture<PatientArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
