import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { _MatListItemGraphicBase } from '@angular/material/list';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = 'cart'
  cart = new BehaviorSubject<Cart>(this.getStoredCart());

  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item: CartItem):void{
    const items = [...this.cart.value.items]

    const itemInCart = items.find((_item)=>_item.id === item.id);

    if(itemInCart){
      itemInCart.quantity += 1;
    }else{
      items.push(item)
    }

    this.updateCart({items})
    this._snackBar.open('1 Item added to cart.','Ok',{duration: 3000})
  }

  getTotal(items:Array<CartItem>):number{
    return items.
    map((item) => item.price * item.quantity)
    .reduce((prev, current) => prev + current, 0)
  }

  clearCart():void{
    this.updateCart({ items: [] });
    this._snackBar.open('Cart is cleared.','Ok',{
      duration:3000
    })
  }

  removeFromCart(item:CartItem,update = true):Array<CartItem>{
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
      )

      if (update) {
        this.updateCart({ items: filteredItems });
        this._snackBar.open('1 Item removed from cart','Ok',{
          duration:3000
        })
    }

    return filteredItems;
  }

  removeQuantity(item:CartItem):void {
    let itemForRemoval: CartItem | undefined

    let filteredItems = this.cart.value.items.map((_item)=>{
      if(_item.id===item.id){
        _item.quantity--;
        if(_item.quantity===0){
          itemForRemoval= _item;
        }
      }
      return _item
    });

    if(itemForRemoval){
      filteredItems = this.removeFromCart(itemForRemoval, false)
    }

    this.updateCart({ items: filteredItems });
    this._snackBar.open('1 item removed from cart.','Ok',{
      duration: 3000
    })
  }

  private updateCart(cart:Cart):void{
    this.cart.next(cart)
    localStorage.setItem(this.cartKey,JSON.stringify(cart))
  }
  getCartItems():Array<CartItem>{
    return this.cart.value.items
  }
  private getStoredCart(): Cart {
    const storedCart = localStorage.getItem(this.cartKey);
    return storedCart ? JSON.parse(storedCart) : { items: [] };
  }
}
