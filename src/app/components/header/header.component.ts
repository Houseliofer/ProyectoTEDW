import { Component, Input, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',

})
export class HeaderComponent implements OnInit {
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
    private router: Router, private searchService: SearchService) { }

    ngOnInit(): void {
      this.searchService.searchKeyword$.subscribe(keyword => {
        this.searchKeyword = keyword;
      });
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
    this.router.navigate(['/register']);
  }
}
