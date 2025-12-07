import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconButton } from './icon-button';
import { inputBinding, signal } from '@angular/core';

describe('IconButton', () => {
  let component: IconButton;
  let fixture: ComponentFixture<IconButton>;
  const iconBoundValue = signal('icon');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconButton],
    }).compileComponents();

    fixture = TestBed.createComponent(IconButton, {
      bindings: [inputBinding('icon', iconBoundValue)],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
