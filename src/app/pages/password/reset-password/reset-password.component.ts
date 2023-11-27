// reset-password.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: [],
})
export class ResetPasswordComponent {
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private storeService: StoreService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      password: ['', Validators.required],
      verifyPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const token = this.route.snapshot.params['token'];
      const newPassword = this.form.value.password;
      
        const password=  this.form.value.password
        const verifyPassword=this.form.value.verifyPassword
       
        if(password!==verifyPassword){
          this._snackBar.open('Passwords do not match', 'Close', {
            duration: 3000,
          });
        }

      this.storeService.resetPassword(token, password,verifyPassword).subscribe(
        (response) => {
          this.router.navigate(['/login']);
          this._snackBar.open('updated password', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          this._snackBar.open('error updating', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this._snackBar.open('All fields are required', 'Close', {
        duration: 3000,
      });
    }
  }
}
