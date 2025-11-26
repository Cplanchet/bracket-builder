import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'bb-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  public variant = input<"primary" | "secondary" | "text">("primary")
  public press = output<void>()

  protected onClick() {
    this.press.emit();
  }
}
