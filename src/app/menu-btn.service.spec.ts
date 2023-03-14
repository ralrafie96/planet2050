import { TestBed } from '@angular/core/testing';

import { MenuBtnService } from './menu-btn.service';

describe('MenuBtnService', () => {
  let service: MenuBtnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuBtnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
