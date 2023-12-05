import { Component } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { jwtDecode } from 'jwt-decode';
import { token } from 'src/app/models/token.model';
import { AddressService } from 'src/app/services/address.service';
import { Address } from 'src/app/models/address.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [`
  .order-title {
    position: relative; /* O absolute según tus necesidades */
    z-index: 1; /* Puedes ajustar el valor según sea necesario para asegurar que esté por encima de otros elementos */
}

  `
  ]
})
export class ProductsComponent {
  orders: any[] = [];
  currentPage: number = 0; // Página actual
  itemsPerPage: number = 1;
  userId: any = localStorage.getItem('jwt');
  productDetails: { [productId: string]: any } = {};
  addressItem: Address = {} as Address;

  constructor(
    private store: StoreService,
    private address: AddressService,
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }
  handlePage(event: any): void {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
  }


  get visibleOrders() {
    const startIndex = this.currentPage * this.itemsPerPage;
    return this.orders.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.orders.length / this.itemsPerPage - 1) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  loadOrders() {
    const token = localStorage.getItem('jwt');
    if (token !== null) {
      const decodedToken: token = jwtDecode(token);
      this.userId = decodedToken._id;
      this.store.getUserOrders(this.userId).subscribe(
        (orders: any) => {
          this.orders = orders;
          console.log('Orders:', this.orders);
          //this.loadProductDetailsForOrders();
          //console.log('Orders:', this.orders[0].address);
          this.loadAddress();
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
    }
  }

  loadAddress() {
    const addressObservables = this.orders.map((order: any) => {
      return this.address.getAddressById(this.userId, order.address);
    });

    forkJoin(addressObservables).subscribe(
      (addresses: any) => {
        this.orders.forEach((order: any, index: number) => {
          order.addressItem = addresses[index];
        });
        console.log('Addresses:', this.orders.map((order: any) => order.addressItem));
      },
      (error) => {
        console.error('Error fetching addresses:', error);
      }
    );
  }

  loadProductDetails(productId: string) {
    this.store.getProductById(productId).subscribe(
      (productDetails: any) => {
        console.log('Product details:', productDetails);
        this.productDetails[productId] = productDetails;
      },
      (error) => {
        console.error(`Error loading product details for ${productId}:`, error);
      }
    );
  }


}
