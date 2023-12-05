import { Component, Renderer2, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreService } from 'src/app/services/store.service';
import { startWith } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { token } from 'src/app/models/token.model';
import { initFlowbite } from 'flowbite';



@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styles: [
  ]
})
export class PrivateComponent implements OnInit {
  isLoggedIn: boolean = false;
  showCategories: boolean = false;
  user: any = {}
  selectedLink: string = '';

  contentStatus: { [key: string]: boolean } = {
    category: false,
    supplier: false,
    brand:false,
    product:false
  };

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private auth: AuthService,
    private _snackbar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private store: StoreService,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {

    if (window.location.pathname === '/private') {
      this.renderer.addClass(document.body, 'admin');
    } else {
      this.renderer.removeClass(document.body, 'admin');
    }
    this.onProfile()
    initFlowbite();


  }
  toggleContent(contentType: string) {
    // Oculta todos los contenidos
    Object.keys(this.contentStatus).forEach(key => {
      this.contentStatus[key] = false;
    });

    // Muestra el contenido específico
    this.contentStatus[contentType] = true;
    // Actualiza el enlace seleccionado
  this.selectedLink = contentType;
  }
  onLogout() {
    this.auth.logout()
    this.isLoggedIn = false;
    this.cdr.detectChanges()
    this.router.navigate(['/login']);
    this._snackbar.open('You have logged out', 'Close', {
      duration: 3000,
    });
  }
  onProfile() {
    const tokenCookie = this.cookie.get('jwt');
    try {
      const decodedToken: token = jwtDecode(tokenCookie);
      const id = decodedToken._id;
      this.store.profile(id).subscribe((data) => {
        this.user = data;
      });
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

}
