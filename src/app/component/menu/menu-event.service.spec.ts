import { TestBed } from '@angular/core/testing';

import { MenuEventService } from './menu-event.service';

describe('MenuEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuEventService = TestBed.get(MenuEventService);
    expect(service).toBeTruthy();
  });
});
