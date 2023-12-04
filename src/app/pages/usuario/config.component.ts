import { Component, Renderer2,OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styles: [
  ]
})
export class ConfigComponent {


  // Toma estos valores como ejemplo
  username = 'Tom Cook';
  email = 'tomcook@example.com';
  theme = 'dark';
  notifications = true;

  constructor(
    private router: Router,
    private renderer: Renderer2
    ) { }

  ngOnInit(): void {
    if (window.location.pathname === '/config') {
      this.renderer.addClass(document.body, 'config-view');
      console.log(this.renderer.addClass(document.body, 'config-view'))
    } else {
      this.renderer.removeClass(document.body, 'config-view');
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
}

