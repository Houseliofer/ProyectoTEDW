// communication.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private searchKeywordSubject = new BehaviorSubject<string>('');

  setSearchKeyword(keyword: string): void {
    this.searchKeywordSubject.next(keyword);
  }

  getSearchKeyword(): BehaviorSubject<string> {
    return this.searchKeywordSubject;
  }
}
