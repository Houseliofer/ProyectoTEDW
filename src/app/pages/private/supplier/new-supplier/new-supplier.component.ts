import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';


@Component({
  selector: 'app-new-supplier',
  templateUrl: 'new-supplier.component.html',
  styles: [
  ]
})
export class NewSupplierComponent implements OnInit{
  @Output() formSubmit: EventEmitter<void> = new EventEmitter<void>();
  @Input() supplierToEdit: any | null = null;
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;

  constructor(
    private _snackBar: MatSnackBar, 
    private fb: FormBuilder,
    private store:StoreService
  ) {
    this.form = this.fb.group({
      supplier: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/)]],
    });    
  }

  ngOnInit(): void {
    if (this.supplierToEdit) {
      this.form.patchValue({
        supplier: this.supplierToEdit.supplier,
      });
    }
  }
  goBackToList() {
    this.goBack.emit();
  }
  onSubmit() {
    if (this.form.valid) {
      const supplierdata: any = {
        supplier: this.form.value.supplier,
      };
   
      if (this.supplierToEdit?._id) {
        // Actualización
        this.store.updateSupplier(this.supplierToEdit._id, supplierdata).subscribe(
          (response) => {
            this.formSubmit.emit();
            this._snackBar.open('Supplier successfully updated', 'Close', {
              duration: 3000,
            });
          },
          (error) => {
            console.error('Error occurred:', error);
            this._snackBar.open('Error updating supplier', 'Close', {
              duration: 3000,
            });
          }
        );
      } else {
        // Registro
        console.log(supplierdata)
        this.store.newSupplier(supplierdata).subscribe(
          (response) => {
            this.formSubmit.emit();
            this.form.reset(); // Limpiar el formulario
            this._snackBar.open('Supplier successfully added', 'Close', {
              duration: 3000,
            });
          },
          (error) => {
            console.error('Error occurred:', error);
            this._snackBar.open('Error adding supplier', 'Close', {
              duration: 3000,
            });
          }
        );
      }
    } else {
      this._snackBar.open('Please fill all the required fields or check that the name does not have special characters', 'Close', {
        duration: 3000,
      });
    }
   }
  }
