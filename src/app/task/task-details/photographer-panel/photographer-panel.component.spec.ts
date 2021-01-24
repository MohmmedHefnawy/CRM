import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographerPanelComponent } from './photographer-panel.component';

describe('PhotographerPanelComponent', () => {
  let component: PhotographerPanelComponent;
  let fixture: ComponentFixture<PhotographerPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographerPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
