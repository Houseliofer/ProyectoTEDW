import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const API_BASE = 'http://localhost:3000/tienda/v1/'
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_BASE}products`);
  } 

  searchRecipes(word: String){
    return this.http.get<Product[]>(`${API_BASE}search/${word}`)
  }

}
