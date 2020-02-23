import { TestBed } from '@angular/core/testing';

import { UpdateDisplayService } from './update-display.service';

describe('UpdateDisplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateDisplayService = TestBed.get(UpdateDisplayService);
    expect(service).toBeTruthy();
  });
});
