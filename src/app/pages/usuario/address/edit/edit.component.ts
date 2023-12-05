import { Component, EventEmitter, Input,Output,SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Address } from 'src/app/models/address.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [`
  `
  ]
})
export class EditComponent {
  @Input() editedAddress: any | null = null;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateSuccess: EventEmitter<void> = new EventEmitter<void>();


  form: FormGroup;
  addressId: string = '';
  //editedAddress: Address | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.editedAddress) {
      this.form.patchValue({
        street: this.editedAddress.street,
        city:this.editedAddress.city,
        state:this.editedAddress.city,
        zip:this.editedAddress.zip
      });
    }
    
    
  }
  onCloseModal() {
    this.closeModal.emit();
  }
 

  loadAddress() {
    this.addressService.getAddressById(this.addressId).subscribe(
      (address: any) => {
        this.form.patchValue({
          street: address.street,
          city: address.city,
          state: address.state,
          zip: address.zip,
        });
      },
      (error) => {
        console.error('Error loading address:', error);
      }
    );
  }
  onSubmit() {
    if (this.form.valid) {
      const updatedAddress = {
        street: this.form.value.street,
        city: this.form.value.city,
        state: this.form.value.state,
        zip: this.form.value.zip,
      };

      this.addressService.updateAddress(this.editedAddress?._id, updatedAddress).subscribe(
        (response) => {
          this.snackBar.open('Address updated successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });

          // Emitir el evento solo si la actualización fue exitosa
          this.updateSuccess.emit();

          // Cerrar el modal
          this.onCloseModal();
        },
        (error) => {
          console.error('Error occurred:', error);
          this.snackBar.open('Error updating address', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }
  
}
