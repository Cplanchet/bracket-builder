import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private router = inject(Router);

  public navigateTo(page: Page) {
    this.router.navigate([page.toString()]);
  }
}

export enum Page {
  HOME = 'home',
  BRACKET = 'bracket',
}
