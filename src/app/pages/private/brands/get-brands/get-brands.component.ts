import { Component } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-get-brands',
  templateUrl: 'get-brands.component.html',
  styles: [
  ]
})
export class GetBrandsComponent {
  Brand: any =[]
  showTable: boolean = true;
  showAddBrandForm: boolean = false;
  editingBrand: any | null = null;

  constructor(private store:StoreService,
    private _snackbar: MatSnackBar,){}


  ngOnInit(): void {
    this.getBrands();
  }

  private getBrands(): void {
    this.store.getBrands().subscribe((data) => {
      this.Brand=data
    });
  }

  deleteBrand(id: string): void {
    this.store.deleteBrand(id).subscribe(
      (response) => {
        this.getBrands();
        this._snackbar.open('action success', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.log(id)
        this._snackbar.open('Error deleting brand', 'Close', {
          duration: 3000,
          
        });
      }
    );
  }

  toggleAddCategoryForm() {
    this.showTable = !this.showTable;
    this.showAddBrandForm = !this.showAddBrandForm;
  }

  onFormSubmit() {    
    this.showTable = true;
    this.showAddBrandForm = false;
    this.editingBrand = null;
    this.getBrands();
  }
  editBrand(brand: any) {
    this.showTable = false;
    this.showAddBrandForm = true;
    this.editingBrand = brand;
  }
  goBackToList() {
    this.showTable = true;
    this.showAddBrandForm = false;
    this.editingBrand = null;
    this.getBrands();
  }

}
