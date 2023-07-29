import { TestBed } from '@angular/core/testing';

import { ListPhotoService } from './list-photo-service';

describe('ListPhotoServiceService', () => {
  let service: ListPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
