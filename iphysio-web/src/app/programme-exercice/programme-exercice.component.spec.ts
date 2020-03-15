import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeExerciceComponent } from './programme-exercice.component';

describe('ProgrammeExerciceComponent', () => {
  let component: ProgrammeExerciceComponent;
  let fixture: ComponentFixture<ProgrammeExerciceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgrammeExerciceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammeExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
