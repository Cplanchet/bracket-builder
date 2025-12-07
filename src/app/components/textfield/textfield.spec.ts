import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Textfield } from './textfield';
import { inputBinding, signal, twoWayBinding, WritableSignal } from '@angular/core';

describe('Textfield', () => {
  let component: Textfield;
  let fixture: ComponentFixture<Textfield>;
  const value: WritableSignal<string> = signal('test');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Textfield],
    }).compileComponents();
    value.set('test');
    fixture = TestBed.createComponent(Textfield, {
      bindings: [inputBinding('id', () => 'test-id'), twoWayBinding('value', value)],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.value()).toEqual('test');
  });
  it('should call onChange when value changes', async () => {
    fixture.autoDetectChanges();
    const newValue = 'new Value';
    const methodSpy = spyOn(component, 'onChange');
    const inputEl = fixture.nativeElement.querySelector('input');

    const event = new InputEvent('input', { data: newValue });

    inputEl.value = newValue;
    inputEl.dispatchEvent(event);

    await fixture.whenStable();

    expect(methodSpy).toHaveBeenCalledWith(event);
  });

  it('should call enterPress when enter is pressed', async () => {
    fixture.autoDetectChanges();
    const methodSpy = spyOn(component, 'onPressEnter');
    const inputEl = fixture.nativeElement.querySelector('input');

    const event = new KeyboardEvent('keydown', { key: 'enter' });

    inputEl.dispatchEvent(event);

    await fixture.whenStable();

    expect(methodSpy).toHaveBeenCalled();
  });

  describe('onChange', () => {
    it('should update value binding', async () => {
      const newValue = 'val2';
      const inputEl = fixture.debugElement.nativeElement.querySelector('input');

      inputEl.value = newValue;
      inputEl.dispatchEvent(new Event('input'));

      await fixture.whenStable();
      expect(component.value()).toEqual(newValue);
      expect(value()).toEqual(newValue);
    });
  });

  describe('onPressEnter', () => {
    it('should emit enterPress', () => {
      const emitSpy = spyOn(component.enterPress, 'emit');
      component.onPressEnter();

      expect(emitSpy).toHaveBeenCalled();
    });
  });
});
