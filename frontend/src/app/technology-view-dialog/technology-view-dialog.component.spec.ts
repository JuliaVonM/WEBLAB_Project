import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyViewDialogComponent } from './technology-view-dialog.component';

describe('TechnologyViewDialogComponent', () => {
  let component: TechnologyViewDialogComponent;
  let fixture: ComponentFixture<TechnologyViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologyViewDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologyViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
