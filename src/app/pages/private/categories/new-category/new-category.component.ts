import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/models/category.model';



@Component({
  selector: 'app-new-category',
  templateUrl:'new-category.component.html',
  styles: [
  ]
})
export class NewCategoryComponent implements OnInit{
  @Output() formSubmit: EventEmitter<void> = new EventEmitter<void>();
  @Input() categoryToEdit: Category | null = null;
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();



  form: FormGroup;

  constructor(
    private _snackBar: MatSnackBar, 
    private fb: FormBuilder,
    private serviceCategory: CategoryService
  ) {
    this.form = this.fb.group({
      categoria: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/)]],
    });    
  }
  ngOnInit(): void {
    if (this.categoryToEdit) {
      this.form.patchValue({
        categoria: this.categoryToEdit.categoria,
      });
    }
  }
  
  goBackToList() {
    this.goBack.emit();
  }

  onSubmit() {
 if (this.form.valid) {
   const categoryData: any = {
     categoria: this.form.value.categoria,
   };

   if (this.categoryToEdit?._id) {
     // Actualización
     this.serviceCategory.update(this.categoryToEdit._id, categoryData).subscribe(
       (response) => {
         this.formSubmit.emit();
         this._snackBar.open('Category successfully updated', 'Close', {
           duration: 3000,
         });
       },
       (error) => {
         console.error('Error occurred:', error);
         this._snackBar.open('Error updating category', 'Close', {
           duration: 3000,
         });
       }
     );
   } else {
     // Registro
     console.log(categoryData)
     this.serviceCategory.newCategory(categoryData).subscribe(
       (response) => {
         console.log(categoryData)
         this.formSubmit.emit();
         this.form.reset(); // Limpiar el formulario
         this._snackBar.open('Category successfully added', 'Close', {
           duration: 3000,
         });
       },
       (error) => {
         console.error('Error occurred:', error);
         this._snackBar.open('Error adding category', 'Close', {
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
