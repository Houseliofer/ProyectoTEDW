import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Subject } from 'rxjs';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';


const API_BASE = 'http://localhost:3000/tienda/v1/'
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private searchKeywordSubject = new Subject<string>();
  searchKeyword$ = this.searchKeywordSubject.asObservable();

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

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
  newUser(user: User): Observable<User> {
    return this.http.post<User>(`${API_BASE}users/register`, user);
  }
  //-----------------------PASSWORD----------------------
  forgotPassword(data: any) {
    return this.http.post(`${API_BASE}forgot-password`, data)
  }
  resetPassword(token: string, newPassword: string, veriPass: string): Observable<any> {
    const body = { password: newPassword, verifyPassword: veriPass }
    return this.http.post(`${API_BASE}reset-password/${token}`, body);
  }
}
