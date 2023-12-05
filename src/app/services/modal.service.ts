import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Address } from '../models/address.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private editModalSubject = new BehaviorSubject<Address | null>(null);
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  openEditModal(address: Address): void {
    this.editModalSubject.next(address);
  }

  closeModal() {
    this.isOpenSubject.next(false);
  }

  getEditModalState(): Observable<Address | null> {
    return this.editModalSubject.asObservable();
  }

  constructor() { }
}
