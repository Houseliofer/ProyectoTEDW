import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { token } from 'src/app/models/token.model';
import { jwtDecode } from 'jwt-decode';
import { StoreService } from 'src/app/services/store.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent {
  form: FormGroup;

  userId: string = '';
  userProfile: any;


  constructor(
    private cookie: CookieService,
    private store: StoreService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [{value:'',disabled:true}, Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = this.getUserIdFromToken();
    this.loadUserProfile();

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

  loadUserProfile() {
    this.store.profile(this.userId).subscribe(
      (response: any) => {
        //console.log('User Profile:', response);
        this.userProfile = response;

        this.form.get('email')?.setValue(this.userProfile.data.email);
        this.form.get('name')?.setValue(this.userProfile.data.name);
        this.form.get('lastname')?.setValue(this.userProfile.data.lastname);
        this.form.get('phone')?.setValue(this.userProfile.data.phone);

        this.form.updateValueAndValidity();
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

  onSubmit() {

    if (this.form.get('password')?.value == this.form.get('repeatPassword')?.value && this.form.get('password')?.value != '') {
      const edit = {
        name: this.form.value.name,
        lastname: this.form.value.lastname,
        email: this.form.value.email,
        password: this.form.value.password,
        repeatPassword: this.form.value.repeatPassword,
        phone: this.form.value.phone
      }
      try {
        this.store.editProfile(this.userId, edit).subscribe(
          (response: any) => {
            console.log('User Profile:', response);
            this.userProfile = response;
          },
          (error: any) => {
            console.log('Error loading user profile:', error);
          }
        )
        this._snackBar.open('Profile Updated', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      } catch (error) {
        console.log('Error editing user profile:', error);
      }
    } else {
      this._snackBar.open('Please fill all the required fields', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }

  }


}
