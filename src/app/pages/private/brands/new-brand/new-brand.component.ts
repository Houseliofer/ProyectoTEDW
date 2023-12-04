import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-new-brand',
  templateUrl: 'new-brand.component.html',
  styles: [
  ]
})
export class NewBrandComponent implements OnInit{
  @Output() formSubmit: EventEmitter<void> = new EventEmitter<void>();
  @Input() brandToEdit: any | null = null;
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;

  constructor(
    private _snackBar: MatSnackBar, 
    private fb: FormBuilder,
    private store:StoreService
  ) {
    this.form = this.fb.group({
      brand: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/)]],
    });    
  }

  ngOnInit(): void {
    if (this.brandToEdit) {
      this.form.patchValue({
        brand: this.brandToEdit.brand,
      });
    }
  }
  goBackToList() {
    this.goBack.emit();
  }
  onSubmit() {
    if (this.form.valid) {
      const brandData: any = {
        brand: this.form.value.brand,
      };
   
      if (this.brandToEdit?._id) {
        // Actualización
        this.store.updateBrand(this.brandToEdit._id, brandData).subscribe(
          (response) => {
            this.formSubmit.emit();
            this._snackBar.open('Brand successfully updated', 'Close', {
              duration: 3000,
            });
          },
          (error) => {
            this._snackBar.open('Error updating brand', 'Close', {
              duration: 3000,
            });
          }
        );
      } else {
        // Registro
        this.store.newBrand(brandData).subscribe(
          (response) => {
            this.formSubmit.emit();
            this.form.reset(); // Limpiar el formulario
            this._snackBar.open('Branda successfully added', 'Close', {
              duration: 3000,
            });
          },
          (error) => {
            console.error('Error occurred:', error);
            this._snackBar.open('Error adding branda', 'Close', {
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

