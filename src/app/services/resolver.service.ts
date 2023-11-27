// token-preload.service.ts

import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResolverResolver implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    const token = route.data && route.data['token']; // Obtén el token desde la data de la ruta
    console.log(token)
    if (token) {
      // Realiza la verificación del token aquí
      const isTokenValid = this.isTokenValid(token);

      if (isTokenValid) {
        // Si el token es válido, carga la página
        return load();
      }
      // Si el token no es válido, retorna un observable vacío
      return of(null);
    }

    // Si la ruta no tiene token, carga la página normalmente
    return load();
  }

  private isTokenValid(token: string): boolean {
    // Implementa tu lógica de validación aquí
    // Devuelve true si el token es válido, false si no lo es
    // Puedes utilizar librerías como 'jsonwebtoken' para verificar la firma y la expiración

    // Ejemplo muy básico de verificación, por favor mejora según tus necesidades
    return !!token;
  }
}
