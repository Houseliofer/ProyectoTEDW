import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { MatSnackBar } from '@angular/material/snack-bar';  // Asegúrate de tener esta importación
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { token } from 'src/app/models/token.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-get-profile',
  templateUrl: 'get-profile.component.html',
  styles: []
})
export class GetProfileComponent implements OnInit {

  user: any = {};
  form: FormGroup;

  constructor(
    private store: StoreService,
    private cookie: CookieService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar  // Asegúrate de tener esta importación
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: [' ', Validators.required]
    });
  }

  ngOnInit(): void {
    this.onProfile();
    console.log(this.idUSer())
  }

  onSubmit() {
    if (this.form.valid) {
      const formProfile = {
        name: this.form.value.name,
        lastname: this.form.value.lastname,
        email: this.form.value.email,
        phone: this.form.value.phone
      };

      this.store.updateUsuario(this.idUSer(), formProfile).subscribe(
        (response) => {
          console.log(response)
          this._snackBar.open('User successfully updated', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          this._snackBar.open('Error updating user', 'Close', {
            duration: 3000,
          });
        }
      );
    }
    this._snackBar.open('check the fields', 'Close', {
      duration: 3000,
    });
  }

  onProfile() {
    try {
      
      this.store.profile(this.idUSer()).subscribe((data) => {
        this.user = data;
        this.form.get('email')?.setValue(this.user.data.email);
        this.form.get('name')?.setValue(this.user.data.name);
        this.form.get('lastname')?.setValue(this.user.data.lastname);
        this.form.get('phone')?.setValue(this.user.data.phone);
      });
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  idUSer() {
    const tokenCookie = this.cookie.get('jwt');
    const decodedToken: token = jwtDecode(tokenCookie);
    const id = decodedToken._id;
    return id;
  }
}
