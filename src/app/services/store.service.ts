import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

const API_BASE = 'http://localhost:3000/tienda/v1/'
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private searchKeywordSubject = new Subject<string>();
  searchKeyword$ = this.searchKeywordSubject.asObservable();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_BASE}products`);
  }

  searchRecipes(word: String) {
    return this.http.get<Product[]>(`${API_BASE}search/${word}`)
  }

  getProductCategory(id: string): Observable<Product[]> {
    // Log para verificar que se está recibiendo el ID de la categoría correctamente
    console.log('Received Category ID in getProductCategory:', id);

    return this.http.get<Product[]>(`${API_BASE}productsCategory/${id}`);
  }
  updateSearchKeyword(keyword: string) {
    this.searchKeywordSubject.next(keyword);
  }

  //------------------------------USUARIO--------------------------------------------------
  newUser(user:User): Observable<User>{  
    return this.http.post<User>(`${API_BASE}users/register`, user);
  }
}
