import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignersPanelComponent } from './designers-panel.component';

describe('DesignersPanelComponent', () => {
  let component: DesignersPanelComponent;
  let fixture: ComponentFixture<DesignersPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignersPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
