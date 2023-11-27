import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})
export class TokenGuard implements CanActivate {
  constructor( private jwt: JwtHelperService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router:Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const token = route.paramMap.get('token');

    if(this.jwt.isTokenExpired(token)||!token){
      this.router.navigate(['/login']);
      this._snackBar.open('link not available', 'Close', {
        duration: 3000,
      });
      return false
    }
    return true;
}

}
