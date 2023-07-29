import { TestBed } from '@angular/core/testing';

import { ListAlbumService } from './list-album.service';

describe('ListAlbumService', () => {
  let service: ListAlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListAlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
