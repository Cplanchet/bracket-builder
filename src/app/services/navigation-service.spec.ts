import { TestBed } from '@angular/core/testing';

import { NavigationService, Page } from './navigation-service';
import { Router } from '@angular/router';

describe('NavigationService', () => {
  let service: NavigationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to given page', () => {
    const routerSpy = spyOn(router, 'navigate');
    const page = Page.HOME;

    service.navigateTo(page);
    expect(routerSpy).toHaveBeenCalledWith([page]);
  });
});
