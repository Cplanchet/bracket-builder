import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerPage } from './winner-page';

describe('WinnerPage', () => {
  let component: WinnerPage;
  let fixture: ComponentFixture<WinnerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinnerPage],
    }).compileComponents();

    fixture = TestBed.createComponent(WinnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
