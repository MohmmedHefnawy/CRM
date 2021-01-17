import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniContainerComponent } from './mini-container.component';

describe('MiniContainerComponent', () => {
  let component: MiniContainerComponent;
  let fixture: ComponentFixture<MiniContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
