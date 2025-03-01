import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyFormDialogComponent } from './technology-form-dialog.component';

describe('TechnologyFormDialogComponent', () => {
  let component: TechnologyFormDialogComponent;
  let fixture: ComponentFixture<TechnologyFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologyFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologyFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
