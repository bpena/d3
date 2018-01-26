import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgForcedComponent } from './svg-forced.component';

describe('SvgForcedComponent', () => {
  let component: SvgForcedComponent;
  let fixture: ComponentFixture<SvgForcedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgForcedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgForcedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
