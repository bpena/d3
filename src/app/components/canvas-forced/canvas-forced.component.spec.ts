import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasForcedComponent } from './canvas-forced.component';

describe('CanvasForcedComponent', () => {
  let component: CanvasForcedComponent;
  let fixture: ComponentFixture<CanvasForcedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasForcedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasForcedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
