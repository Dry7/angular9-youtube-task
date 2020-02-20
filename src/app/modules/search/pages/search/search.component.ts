import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { Observable } from 'rxjs';
import { SearchListItem, SearchListResponse } from '../../types';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public search$ = new Observable<SearchListItem[]>();

  constructor(private readonly youtubeService: YoutubeService) { }

  ngOnInit(): void {
    this.search$ = this.youtubeService
      .searchVideos(50)
      .pipe(
        map((response: SearchListResponse) => response.items)
      );
  }
}
