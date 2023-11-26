import { inject,Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

Injectable({ 
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{

  constructor(
    private authService:AuthService,
    private router:Router
  ) { } 

  canActivate(): boolean {

    if(!this.authService.isAuth()){
      console.log('Token is not valid or is expired');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
