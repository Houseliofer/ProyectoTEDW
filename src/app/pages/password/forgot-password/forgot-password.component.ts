import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: [
  ]
})
export class ForgotPasswordComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, 
    private storeService:StoreService,
    private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const login = {
        email: this.form.value.email,
      };
 
      this.storeService.forgotPassword(login).subscribe(
        (response) => {
          // Manejar la respuesta del backend, por ejemplo, mostrar un mensaje de éxito
          this._snackBar.open('Password recovery email sent successfully!', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          // Manejar cualquier error que pueda ocurrir
          this._snackBar.open('user does not exist', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this._snackBar.open('Please fill all the required fields', 'Close', {
        duration: 3000,
      });
    }
  }
  

}
