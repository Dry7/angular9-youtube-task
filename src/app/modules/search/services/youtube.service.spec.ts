import { TestBed } from '@angular/core/testing';

import { YoutubeService } from './youtube.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('YoutubeService', () => {
  let service: YoutubeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ YoutubeService ],
    });
    service = TestBed.inject(YoutubeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should searchVideos with empty query', () => {
    service.searchVideos('', 50, null).subscribe();

    httpMock.expectOne('https://www.googleapis.com/youtube/v3/search?'
      + 'key=&order=date&part=snippet&type=video,id&maxResults=50'
    );
  });

  it('should searchVideos with query', () => {
    service.searchVideos('test', 50, null).subscribe();

    httpMock.expectOne('https://www.googleapis.com/youtube/v3/search?'
      + 'key=&order=date&part=snippet&type=video,id&maxResults=50&q=test'
    );
  });

  it('should searchVideos with limit', () => {
    service.searchVideos('', 10, null).subscribe();

    httpMock.expectOne('https://www.googleapis.com/youtube/v3/search?'
      + 'key=&order=date&part=snippet&type=video,id&maxResults=10'
    );
  });

  it('should searchVideos with nextPage', () => {
    service.searchVideos('', 50, 'CBQQAA').subscribe();

    httpMock.expectOne('https://www.googleapis.com/youtube/v3/search?'
      + 'key=&order=date&part=snippet&type=video,id&maxResults=50&pageToken=CBQQAA'
    );
  });

  it('should searchVideos with all parameters', () => {
    service.searchVideos('test', 3, 'CBQQAA').subscribe();

    httpMock.expectOne('https://www.googleapis.com/youtube/v3/search?'
      + 'key=&order=date&part=snippet&type=video,id&maxResults=3&q=test&pageToken=CBQQAA'
    );
  });
});
