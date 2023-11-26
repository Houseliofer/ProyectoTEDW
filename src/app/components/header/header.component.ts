import { Component, Input, OnInit,ChangeDetectorRef } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',

})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false; 
[x: string]: any;
  searchKeyword: string = '';

  private _cart: Cart = { items: [] }
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0)
  }

  constructor(private cartService: CartService,
    private router: Router, private searchService: StoreService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef ) { }

    ngOnInit(): void {
      this.searchService.searchKeyword$.subscribe(keyword => {
        this.searchKeyword = keyword;
      });
      this.isLoggedIn = this.auth.isAuth();
  
    }
  
    search() {
      // Puedes realizar acciones adicionales si es necesario
      this.searchService.updateSearchKeyword(this.searchKeyword);
    }
  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items)
  }

  onClearCart() {
    this.cartService.clearCart();
  }
  onLogin() {
    this.router.navigate(['/login']);
  }
  onRegister() {
    this.router.navigate(['/private']);
  }
  onLogout() {
    this.auth.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
