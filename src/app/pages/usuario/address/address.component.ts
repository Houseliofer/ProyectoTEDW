import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { token } from 'src/app/models/token.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreService } from 'src/app/services/store.service';
import { Address } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styles: [
  ]
})
export class AddressComponent {
  //addresses: {};
  userAddresses: Address[] = [];
  userId: string = '';
  isEditModalOpen = false;
  editingAddress: any | null = null;  


  editAddress(address: Address) {
    this.editingAddress = address;
    this.isEditModalOpen = true;
  }
  closeEditModal() {
    this.isEditModalOpen = false; // Cierra el modal de edit
    this.editingAddress = null; // Limpia la dirección que se estaba editando
  }
  
  form: FormGroup;
  userProfile: any;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private store: StoreService,
    private addressService: AddressService,
  ) {
    this.form = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });

  }

  loadAddresses() {
    // Obtén el ID del usuario de tu servicio de autenticación
    this.addressService.getUserAddresses(this.userId).subscribe(
      (addresses: any) => {
        this.userAddresses = addresses.addresses;
      },
      (error) => {
        console.error('Error fetching addresses:', error);
      }
    );
  }
  onAddAddress() {
    const newAddress: Address = {
      street: this.form.value.street,
      city: this.form.value.city,
      state: this.form.value.state,
      zip: this.form.value.zip,
    }

    this.addressService.addAddress(this.userId, newAddress).subscribe(
      () => {
        this.loadAddresses();
        this._snackBar.open('Address added', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.form.reset();
      },
      (error) => {
        this._snackBar.open('Error adding address', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        console.error('Error adding address:', error);
      }
    );
    //console.log('Address:', newAddress);

  }

  onDeleteAddress(addressId: any) {
    this.addressService.deleteAddress(this.userId, addressId).subscribe(
      () => {
        this.loadAddresses();
        this._snackBar.open('Address deleted', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      (error) => {
        this._snackBar.open('Error deleting address', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );

  }
  ngOnInit(): void {
    this.userId = this.getUserIdFromToken();
    //this.loadUserProfile();
    // this.loadAddresses();
    this.loadAddresses();
    this.form.reset();
  }

  /*loadAddresses() {
    this.store.getAddresses(this.userId).subscribe(
      (response: any) => {
        console.log('Addresses:', response);
        this.addresses = response;
      },
      (error: any) => {
        this._snackBar.open('Error loading addresses', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        //console.log('Error loading addresses:', error);
      }
    )
  }*/

  getUserIdFromToken(): string {
    const tokenCookie = localStorage.getItem('jwt');
    try {
      if (tokenCookie !== null) {
        const decodedToken: token = jwtDecode(tokenCookie);
        const userId = decodedToken._id;
        //console.log('Decoded Token:', decodedToken);
        return userId;
      }else return ''
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


  onSubmit() {
    if (this.form.valid) {
      const edit = {
        street: this.form.value.street,
        zip: this.form.value.zip,
        city: this.form.value.city,
        state: this.form.value.state,
      }
      try {
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
      } catch (error) {
        this._snackBar.open('Error loading user address', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    } else {
      this._snackBar.open('Error loading user address', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

}
