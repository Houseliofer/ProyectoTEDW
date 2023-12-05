import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route } from '@angular/router';
import { Cart,CartItem } from 'src/app/models/cart.model'
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {
  
  cart: Cart = {items:[{
    product: 'https://via.placeholder.com/150',
    name: 'shoes',
    price: 150,
    quantity: 1,
    id: "1",
  },
  {
    product: 'https://via.placeholder.com/150',
    name: 'shoes',
    price: 150,
    quantity: 3,
    id: "2",
  }
]};

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
     'name',
     'price',
     'quantity',
     'total',
     'action'
  ];

  constructor(
    private cartService:CartService,
    private authServce:AuthService,
    private _snackBar:MatSnackBar,
    private router:Router){}

  ngOnInit(): void{
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart)=>{
      this.cart = _cart;
      this.dataSource = this.cart.items
    })

    //console.log(this.pedido);
  }

  getTotal(items: Array<CartItem>):number{
    return this.cartService.getTotal(items)
  }

  getTotalItems(items: Array<CartItem>): number {
    return items.reduce((total, item) => total + item.quantity, 0);
  }
  
  onClearCart():void{
    this.cartService.clearCart();
  }

  onRemoveFromCart(item:CartItem):void{
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item:CartItem):void{
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item:CartItem):void{
    this.cartService.removeQuantity(item)
  }

  onProceedToCheckout():void{
    if(this.authServce.isAuth()){
      this.router.navigate(['/payment']);
    }else{
      this._snackBar.open('You Must Be Logged In', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }
}
