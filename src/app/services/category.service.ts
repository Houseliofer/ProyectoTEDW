import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
const API_BASE = 'http://localhost:3000/tienda/v1/'


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategory():Observable<Category[]>{
    return this.http.get<Category[]>(`${API_BASE}categories`)
  }
}
