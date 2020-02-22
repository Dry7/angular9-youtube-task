import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchListResponse } from '../types';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private endpoint = 'https://www.googleapis.com/youtube/v3/';

  constructor(private readonly http: HttpClient) { }

  searchVideos(limit: number, nextPage: string | null): Observable<SearchListResponse> {
    return this.http.get<SearchListResponse>(`${this.endpoint}search?key=${environment.youTube.apiKey}`
      + `&order=date&part=snippet &type=video,id&maxResults=${limit}`
      + (nextPage !== null ? `&pageToken=${nextPage}` : '')
    );
  }
}
