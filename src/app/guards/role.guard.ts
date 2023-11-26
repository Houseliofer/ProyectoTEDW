import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { token } from '../models/token.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRol'];
    const tokenCookie = this.cookieService.get('jwt');
  
    if (tokenCookie !== null) {
      const tokenParts = tokenCookie.split('.');
  
      if (tokenParts.length !== 3) {
        console.error('Invalid token format');
        this.router.navigate(['login']);
        return false;
      }
  
      try {
        const decodedToken: token = jwtDecode(tokenCookie);
        const role = decodedToken.role;

        if (!this.authService.isAuth() || role !== expectedRole) {
          console.error('You do not have permission!');
          this.router.navigate(['home']);
          return false;
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        this.router.navigate(['login']);
        return false;
      }
    } else {
      console.error('It does not exist token');
      this.router.navigate(['login']);
      return false;
    }
  
    return true;
  }
  
}