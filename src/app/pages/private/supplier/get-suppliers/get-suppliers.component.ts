import { Component } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-get-suppliers',
  templateUrl: 'get-suppliers.component.html',
  styles: [
  ]
})
export class GetSuppliersComponent {
  Suppliers: any =[]
  showTable: boolean = true;
  showAddSupplierForm: boolean = false;
  editingSupplier: any | null = null;


  constructor(private store:StoreService,
    private _snackbar: MatSnackBar,){

  }

  ngOnInit(): void {
    this.getSupplier();
  }

  private getSupplier(): void {
    this.store.getSuppliers().subscribe((data) => {
      this.Suppliers = data;
    });
  }
  toggleAddSupplierForm() {
    this.showTable = !this.showTable;
    this.showAddSupplierForm = !this.showAddSupplierForm;
  }


  deleteSupplier(id: string): void {
    this.store.deleteSupplier(id).subscribe(
      (response) => {
        this.getSupplier();
        this._snackbar.open('action success', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        this._snackbar.open('Error deleting Supplier', 'Close', {
          duration: 3000,
        });
      }
    );
  }
  onFormSubmit() {    
    this.showTable = true;
    this.showAddSupplierForm = false;
    this.editingSupplier = null;
    this.getSupplier();
  }
  editSupplier(supplier: any) {
    this.showTable = false;
    this.showAddSupplierForm = true;
    this.editingSupplier = supplier;
  }
  goBackToList() {
    this.showTable = true;
    this.showAddSupplierForm = false;
    this.editingSupplier = null;
    this.getSupplier();
  }


}
