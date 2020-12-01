import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsGraphComponent } from './movements-graph.component';

describe('MovementsGraphComponent', () => {
  let component: MovementsGraphComponent;
  let fixture: ComponentFixture<MovementsGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementsGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
