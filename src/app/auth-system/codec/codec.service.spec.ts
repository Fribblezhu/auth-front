import { TestBed } from '@angular/core/testing';

import { CodeCService } from './codec.service';

describe('CodecService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodeCService = TestBed.get(CodeCService);
    expect(service).toBeTruthy();
  });
});
