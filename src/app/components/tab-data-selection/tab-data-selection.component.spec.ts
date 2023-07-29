import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabDataSelectionComponent } from './tab-data-selection.component';

describe('TabDataSelectionComponent', () => {
  let component: TabDataSelectionComponent;
  let fixture: ComponentFixture<TabDataSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabDataSelectionComponent]
    });
    fixture = TestBed.createComponent(TabDataSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
