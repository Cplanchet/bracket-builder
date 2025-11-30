import { inject } from "@angular/core";
import { Router } from "@angular/router";

export enum Page {
  HOME = 'home',
  BRACKET = 'bracket'
}
export class NavigationUtil {
  private router: Router;
  constructor(router: Router) {
    this.router = router
  }
  public navigateTo(page: Page) {
    this.router.navigate([page.toString()])
  }
}
