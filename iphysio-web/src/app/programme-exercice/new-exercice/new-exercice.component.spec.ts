import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExerciceComponent } from './new-exercice.component';

describe('NewExerciceComponent', () => {
  let component: NewExerciceComponent;
  let fixture: ComponentFixture<NewExerciceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExerciceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
