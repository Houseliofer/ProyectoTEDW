import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  model: any = {};

  constructor(private _snackBar: MatSnackBar) { }

  onSubmit() {
    // Verificar si los campos requeridos están llenos
    if (this.model.firstName && this.model.lastName && this.model.email && this.model.password && this.model.phone) {
      // Lógica para manejar el envío del formulario
      console.log('Form sent', this.model);
      // Aquí puedes agregar la lógica para enviar los datos al backend, por ejemplo.
    } else {
      this._snackBar.open('Please fill all the required fields', 'Close', {
        duration: 3000,
      });
    }
  } 
}
