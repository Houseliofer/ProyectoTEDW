import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
const API_BASE = 'http://18.207.153.86:3000/tienda/v1/'


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategory():Observable<Category[]>{
    return this.http.get<Category[]>(`${API_BASE}categories`)
  }
  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${API_BASE}deleteCategory/${id}`);
  }
  newCategory(data: any): Observable<any> {
    return this.http.post<any>(`${API_BASE}newCategory`, data);
  }
  update(id: string, data:any){
    return this.http.patch(`${API_BASE}updateCategory/${id}`,data)
  }
  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${API_BASE}categories/${id}`);
  }
  
}
