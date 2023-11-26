import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styles: [],
})
export class RegisterComponent {
  register: FormGroup;
  user: User | null = null; // Cambié User[] a User | null

  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private storeService: StoreService,
    private router:Router
  ) {
    this.register = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.register.valid) {
      const newUser: User = {
        name: this.register.value.name,
        lastname: this.register.value.lastname,
        email: this.register.value.email,
        password: this.register.value.password, //
        phone: this.register.value.phone,
      };
      console.log(newUser)
      this.storeService.newUser(newUser).subscribe(
        (user) => {
          this.user = user;
          this.router.navigate(['/home'])
          this._snackBar.open('you can now login', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Error creating user', error);
        }
      );
    } else {
      this._snackBar.open('Please fill all the required fields', 'Close', {
        duration: 3000,
      });
    }
  }
}
