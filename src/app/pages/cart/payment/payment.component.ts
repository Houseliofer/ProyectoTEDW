import { Component } from '@angular/core';
import { PaymentMethod } from 'src/app/models/payment.model';
import { CartService } from 'src/app/services/cart.service';
import { PaymentService } from 'src/app/services/payment.service';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Address } from 'src/app/models/address.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styles: [
  ]
})
export class PaymentComponent {
  cartItems: any[] = [];
  paymentMethods: PaymentMethod[] = [];
  selectedPaymentMethodId: string = '';
  userAddresses: Address[] = [];
  selectedAddress: Address | null = null;
  userId: string = '';
  constructor(
    private cartService: CartService,
    private paymentService: PaymentService,
    private cookieService: CookieService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private route: Router,
    private addressService: AddressService
    ) { }

  ngOnInit(): void {
    const token = this.cookieService.get('jwt');
      const decodedToken: any = jwtDecode(token);
      if (decodedToken) {
        this.userId = decodedToken._id;

        this.addressService.getUserAddresses(this.userId)
        .subscribe((response: any) => {
          this.userAddresses = response.addresses;
          console.log('Addresses:', this.userAddresses);
          this.selectedAddress = this.userAddresses.length>0?this.userAddresses[0]:null;
        }
        );
      }

    // Obten los elementos del carrito al cargar la vista de checkout
    this.cartItems = this.cartService.getCartItems();
    this.paymentMethods = this.paymentService.getPaymentMethods();
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalCost(): number {
    return this.cartService.getTotal(this.cartItems);
  }


  onPay(): void {
    const totalQty = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    
    const paymentData ={
      user: this.userId,
      cart: {
        totalQty: totalQty,
        totalCost: this.cartService.getTotal(this.cartItems),
        items: this.cartItems.map(item => ({
          product: item.id,
          qty: item.quantity,
          price: item.price,
        })),
      },
      address: this.selectedAddress?._id,
      paymentId: this.selectedPaymentMethodId,
      createdAt: new Date().toISOString(),
      Delivered: false,
    };

    this.http.post('http://localhost:3000/tienda/v1/neworder', paymentData,{ withCredentials: true })
    .subscribe((response: any) => {
      //console.log('Payment Data:', paymentData);
      //console.log('Payment Response:', response);
      this._snackBar.open('Order placed successfully', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

      this.cartService.clearCart();
      this.route.navigate(['/config']);
    }
    );
    // Agrega lógica de pago aquí
    this.paymentService.processPayment(this.getTotalCost());
    console.log('Processing payment...');
    // Puedes redirigir a una página de confirmación o realizar otras acciones necesarias
  }
}
