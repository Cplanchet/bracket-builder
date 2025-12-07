import { Component, input } from '@angular/core';
import { Button } from '../button/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'bb-icon-button',
  imports: [NgClass],
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.scss',
})
export class IconButton extends Button {
  public icon = input.required<string>();
}
