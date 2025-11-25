import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppTitle } from "./components/app-title/app-title";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppTitle],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('bracket-builder');
}
