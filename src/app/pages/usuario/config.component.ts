import { Component, Renderer2,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreService } from 'src/app/services/store.service';
import { jwtDecode } from 'jwt-decode';
import { token } from 'src/app/models/token.model';
import { CookieService } from 'ngx-cookie-service';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styles: [
  ]
})
export class ConfigComponent {
  isLoggedIn: boolean = false;
  selectedLink: string = '';
  userId: string = '';
  userProfile: any;
  

  contentStatus: { [key: string]: boolean } = {
    profile: false,
    address :false,
    products: true
  };

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private auth: AuthService,
    private _snackbar: MatSnackBar,
    private store:StoreService,
    private cookie:CookieService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    if (window.location.pathname === '/config') {
      this.renderer.addClass(document.body, 'config-view');
      //console.log(this.renderer.addClass(document.body, 'config-view'))
    } else {
      this.renderer.removeClass(document.body, 'config-view');
    }

    this.userId = this.getUserIdFromToken();
    this.loadUserProfile();
    initFlowbite();


  }
  
  loadUserProfile() {
    this.store.profile(this.userId).subscribe(
      (response: any) => {
        //console.log('User Profile:', response);
        this.userProfile = response;

      },
      (error: any) => {
        this._snackBar.open('Error loading user profile', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        //console.log('Error loading user profile:', error);
      }
    )
  }
  getUserIdFromToken(): string {
    const tokenCookie = this.cookie.get('jwt');
    try {
      const decodedToken: token = jwtDecode(tokenCookie);
      const userId = decodedToken._id;
      //console.log('Decoded Token:', decodedToken);
      return userId;
    } catch (error) {
      this._snackBar.open('Error Decoding token', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      //console.log('Error Decoding token:', error);
      return '';
    }
  }
  // Implementa aquí tus funciones para guardar los cambios
  saveChanges() {
    console.log('Cambios guardados');
  }

  // Implementa aquí tus funciones para cancelar los cambios
  cancelChanges() {
    console.log('Cambios cancelados');
  }

  onHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.auth.logout();
    this.auth.updateLoggedInState();
    this.router.navigate(['/home']);
    this._snackbar.open('You have logged out', 'Close', {
      duration: 3000,
    });
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
}

