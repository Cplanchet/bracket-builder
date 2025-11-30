import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BracketPage } from './bracket-page';

describe('BracketPage', () => {
  let component: BracketPage;
  let fixture: ComponentFixture<BracketPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BracketPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BracketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
