import { Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isLoggedIn = false;
  
    login() {
      // Lógica para iniciar sesión (puede incluir una llamada a un backend, etc.)
      this.isLoggedIn = true;
    }
  
    logout() {
      // Lógica para cerrar sesión
      this.isLoggedIn = false;
    }
  
    isLoggedInUser(): boolean {
      return this.isLoggedIn;
    }
  }