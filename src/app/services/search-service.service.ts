// search.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchKeywordSubject = new Subject<string>();
  searchKeyword$ = this.searchKeywordSubject.asObservable();

  updateSearchKeyword(keyword: string) {
    this.searchKeywordSubject.next(keyword);
  }
}