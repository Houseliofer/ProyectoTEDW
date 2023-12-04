import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { ImageConfig } from '@angular/common';

@Component({
  selector: 'app-new-product',
  templateUrl: 'new-product.component.html',
  styles: [
    
  ]
})
export class NewProductComponent {

  @Output() formSubmit: EventEmitter<void> = new EventEmitter<void>();
  @Input() ProductToEdit: any | null = null;
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();

  colores: string[] = [];
  categories: Category[] = [];
  suppliers: any[] = [];
  brands: any[] = [];
  form: FormGroup;
  valor: any|null

  constructor(
    private _snackBar: MatSnackBar, 
    private fb: FormBuilder,
    private store: StoreService,
    private category: CategoryService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      colors: ['', Validators.required],
      material: ['', Validators.required],
      category: ['', Validators.required],
      supplier: ['', Validators.required],
      brand: ['', Validators.required],
      details: [[], Validators.required],
      description: ['', Validators.required],
      images: this.fb.array([]), // Inicializa el campo de imágenes como una cadena vacía
    });
  }
  onFileChange(event: any) {
    const files = event.target.files;
    const imageArray = this.form.get('images') as FormArray;
  
    // Limpiar el FormArray antes de agregar nuevos archivos
    imageArray.clear();
  
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
      this.getBase64(file).then((base64String: string) => {
        // Agregar el valor al FormArray como un FormControl
        imageArray.push(this.fb.control(base64String));
      });
    }
  }  

  ngOnInit(): void {
    this.category.getCategory().subscribe((data) => {
      this.categories = data;
    });

    this.store.getSuppliers().subscribe((data) => {
      this.suppliers = data;
    });

    this.store.getBrands().subscribe((brands) => {
      this.brands = brands;
    });
  }

  onSubmit() {
  
    if (this.form.valid) {
            const productData: any = {
              name: this.form.value.name,
              price: this.form.value.price,
              quantity: this.form.value.quantity,
              colors: this.form.value.colors,
              material: this.form.value.material,
              category: this.form.value.category,
              supplier: this.form.value.supplier,
              brand: this.form.value.brand,
              details: this.form.value.details,
              description: this.form.value.description,
              images: this.form.value.images,
            };

            this.store.newProduct(productData).subscribe(
              (response) => {
                this.formSubmit.emit();
                this._snackBar.open('Product successfully updated', 'Close', {
                  duration: 3000,
                });
              },
              (error) => {
                console.error('Error occurred:', error);
                this._snackBar.open('Error creating product', 'Close', {
                  duration: 3000,
                });
              }
            )
  
    } else {
      console.log('Formulario no válido');
    }
  }
  
  get imagesArray(): FormArray | null {
    return this.form.get('images') as FormArray | null;
  }
  
  removeImage(index: number): void {
    const imageArray = this.form.get('images') as FormArray;
    imageArray.removeAt(index);
  }
  

  getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };  
      // Obtiene el tipo de archivo y construye la cadena base64 con el prefijo correcto
      const fileType = file.type;
      reader.readAsDataURL(new Blob([file], { type: fileType }));
      // También puedes intentar con: reader.readAsDataURL(file);
    });
  }
  
}
