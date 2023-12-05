import { Component } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-get-orders',
  templateUrl:'get-orders.component.html',
  styles: [
  ]
})
export class GetOrdersComponent {
  showTable: boolean = true;
  showAddOrdersForm: boolean = false;
  editingOrders: any | null = null;  
  Orders: any =[];

  constructor(private store:StoreService, private _snackbar: MatSnackBar) {}


  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders(): void {
    this.store.getOrders().subscribe((data) => {
      this.Orders = data;
    });
  }
  toggleAddOrdersForm() {
    this.showTable = !this.showTable;
    this.showAddOrdersForm = !this.showAddOrdersForm;
  }

  deleteOrders(id: string): void {
    this.store.deleteProduct(id).subscribe(
      (response) => {
        this.getOrders();
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
    this.showAddOrdersForm = false;
    this.editingOrders = null;
    this.getOrders();
  }

  editOrders(orders: any) {
    this.showTable = false;
    this.showAddOrdersForm = true;
    this.editingOrders = orders;
  }

  goBackToList() {
    this.showTable = true;
    this.showAddOrdersForm = false;
    this.editingOrders = null;
    this.getOrders();
  }
}
