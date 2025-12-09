import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Button } from './button';
import { By } from '@angular/platform-browser';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit on click', () => {
    const pressSpy = spyOn(component.press, 'emit');
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click');
    expect(pressSpy).toHaveBeenCalled();
  });
});
