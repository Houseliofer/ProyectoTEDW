import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
import { Token } from "@angular/compiler";

const API_BASE = 'http://localhost:3000/tienda/v1';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuth());
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private cookieService: CookieService) { }

    login(data: any) {
      return this.http.post(`${API_BASE}/users/login`, data, { withCredentials: true })
        .pipe(
          tap(() => {
            this.updateLoggedInState(); // Agrega esta línea
          })
        );
     }
  updateLoggedInState() {
    this.isLoggedInSubject.next(this.isAuth());
  }
  isAuth(): boolean {
    const token = this.cookieService.get('jwt');
    //console.log(token)
    if (this.jwtHelper.isTokenExpired(token) || !token) {
      return false;
    }
    return true;
  }
  logout(): /*void*/Observable<any> {
    this.cookieService.delete('jwt');
    this.router.navigate(['login']);
    return this.http.post(`${API_BASE}/users/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        console.log('Logout successful');
      })
    );
  }
  

}
