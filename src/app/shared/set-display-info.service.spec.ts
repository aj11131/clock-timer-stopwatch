import { TestBed } from '@angular/core/testing';

import { SetDisplayInfoService } from './set-display-info.service';

describe('SetDisplayInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetDisplayInfoService = TestBed.get(SetDisplayInfoService);
    expect(service).toBeTruthy();
  });
});
