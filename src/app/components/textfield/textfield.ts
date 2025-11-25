import { NgClass } from '@angular/common';
import { Component, Input, input, model } from '@angular/core';

@Component({
  selector: 'bb-textfield',
  imports: [NgClass],
  templateUrl: './textfield.html',
  styleUrl: './textfield.scss',
})
export class Textfield {
  public id = input.required<string>();
  public label = input<string>();
  public variant = input<'primary' | 'secondary'>('primary')
  public error = input<string>();
  public value = model<string>();

  public onChange($event: Event) {
    this.value.set(($event?.target as HTMLInputElement).value)
  }
}
