import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { token } from 'src/app/models/token.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styles: [
  ]
})
export class AddressComponent {
  form: FormGroup;
  userId: string = '';
  userProfile: any;

  constructor(
    private fb: FormBuilder,
    private cookie: CookieService,
    private _snackBar: MatSnackBar,
    private store: StoreService
  ) { 
    this.form = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
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
        console.log('User Profile:', response);
        this.userProfile = response;

        this.form.get('street')?.setValue(this.userProfile.data.street);
        this.form.get('zip')?.setValue(this.userProfile.data.zip);
        this.form.get('city')?.setValue(this.userProfile.data.city);
        this.form.get('state')?.setValue(this.userProfile.data.state);

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
    if(this.form.valid){
      const edit = {
        street: this.form.value.street,
        zip: this.form.value.zip,
        city: this.form.value.city,
        state: this.form.value.state,
      }
      try{
        this.store.editProfile(this.userId, edit).subscribe(
          (response: any) => {
            this._snackBar.open('Address updated', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            //console.log('Address updated:', response);
          },
          (error: any) => {
            this._snackBar.open('Error updating address', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            //console.log('Error updating address:', error);
          }
        )
      }catch(error){
        this._snackBar.open('Error loading user address', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    }else{
      this._snackBar.open('Error loading user address', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

}
