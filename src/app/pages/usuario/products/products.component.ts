import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { StoreService } from 'src/app/services/store.service';
import { jwtDecode } from 'jwt-decode';
import { token } from 'src/app/models/token.model';
import { AddressService } from 'src/app/services/address.service';
import { Address } from 'src/app/models/address.model';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
  ]
})
export class ProductsComponent {
  orders: any[] = [];
  userId: any = this.cookie.get('jwt');
  productDetails: {[productId: string]: any} = {};
  addressItem: Address[] = [];

  constructor(
    private store: StoreService,
    private cookie:CookieService,
    private address: AddressService
  ) { }

  ngOnInit(): void {
   

    this.loadOrders();
  }

  loadOrders() {
    const token = this.cookie.get('jwt');
    const decodedToken: token = jwtDecode(token);
    this.userId = decodedToken._id;
    this.store.getUserOrders(this.userId).subscribe(
      (orders: any) => {
        this.orders = orders;
        console.log('Orders:', this.orders);
        //this.loadProductDetailsForOrders();
        console.log('Orders:', this.orders[0].address);
        this.loadAddress();
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  loadAddress() {
    this.address.getAddressById(this.userId,this.orders[0].address).subscribe(
      (address: any) => {
        this.addressItem = address;
        console.log('Address:', this.addressItem);
      },
      (error) => {
        console.error('Error fetching address:', error);
      }
    );
  }
  loadProductDetailsForOrders() {
    this.orders.forEach((order:any) => {
      order.cart.items.forEach((item:any) => {
        if (!this.productDetails[item.product]) {
          // Solo cargar detalles del producto si no se han cargado previamente
          this.store.getProductById(item.product).subscribe(
            (productDetails: any) => {
              console.log('Product details:', productDetails);
              this.productDetails[item.product] = productDetails;
            },
            (error) => {
              console.error(`Error loading product details for ${item.product}:`, error);
            }
          );
        }
      });
    });
  }

}
