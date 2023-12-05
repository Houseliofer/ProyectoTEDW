import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Address } from 'src/app/models/address.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [`
    .modal-overlay {
      
    }
  `
  ]
})
export class EditComponent {
  isOpen$ = this.modalService.isOpen$;

  form: FormGroup;
  addressId: string = '';
  editedAddress: Address | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService,
    private snackBar: MatSnackBar,
    private modalService: ModalService
  ) {
    this.form = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const addressIdParam = this.route.snapshot.paramMap.get('id');
    this.addressId = addressIdParam !== null ? addressIdParam : '';
    //this.loadAddress();

  }

  // loadAddress() {
  //   this.addressService.getAddressById(this.addressId).subscribe(
  //     (address: any) => {
  //       this.form.patchValue({
  //         street: address.street,
  //         city: address.city,
  //         state: address.state,
  //         zip: address.zip,
  //       });
  //     },
  //     (error) => {
  //       console.error('Error loading address:', error);
  //     }
  //   );
  // }
  onSubmit() {
    if (this.form.valid) {
      const updatedAddress = {
        street: this.form.value.street,
        city: this.form.value.city,
        state: this.form.value.state,
        zip: this.form.value.zip,
      };

      this.addressService.editAddress(this.addressId, updatedAddress).subscribe(
        (response) => {
          this.snackBar.open('Address updated successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate(['/addresses']);
        },
        (error) => {
          console.error('Error updating address:', error);
        }
      );
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }

}
