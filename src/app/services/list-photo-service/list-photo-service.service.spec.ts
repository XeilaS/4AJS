import { TestBed } from '@angular/core/testing';

import { ListPhotoServiceService } from './list-photo-service.service';

describe('ListPhotoServiceService', () => {
  let service: ListPhotoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListPhotoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
