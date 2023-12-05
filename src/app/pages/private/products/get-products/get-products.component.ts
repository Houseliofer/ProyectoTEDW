import { Component, ViewChild } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-get-products',
  templateUrl:'get-products.component.html',
  styles: [
  ]
})
export class GetProductsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  Products: any =[];
  showTable: boolean = true;
  showAddProductForm: boolean = false;
  editingProduct: any | null = null;  

  constructor(private store:StoreService, private _snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(): void {
    this.store.getProducts().subscribe((data) => {
      this.Products = new MatTableDataSource(data);
      this.Products.paginator = this.paginator;
    });
  }

  toggleAddProductForm() {
    this.showTable = !this.showTable;
    this.showAddProductForm = !this.showAddProductForm;
  }

  deleteProduct(id: string): void {
    this.store.deleteProduct(id).subscribe(
      (response) => {
        this.getProducts();
        this._snackbar.open('Action success', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.log(error)
        this._snackbar.open('Error deleting product', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  onFormSubmit() {    
    this.showTable = true;
    this.showAddProductForm = false;
    this.editingProduct = null;
    this.getProducts();
  }

  editProduct(product: any) {
    this.showTable = false;
    this.showAddProductForm = true;
    this.editingProduct = product;
  }

  goBackToList() {
    this.showTable = true;
    this.showAddProductForm = false;
    this.editingProduct = null;
    this.getProducts();
  }
}
