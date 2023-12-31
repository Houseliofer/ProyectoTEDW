import { Component, OnInit } from '@angular/core';
import { Cart } from './models/cart.model';
import { CartService } from './services/cart.service';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-root',
  template: `
    <div class="grid grid-template-rows: 1fr auto min-h-screen">
      <app-header [cart]="cart"></app-header>
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit{
  cart: Cart = { items:[]};

  constructor(
    private cartService: CartService,
    private router:Router
    ){
      this.router.events.subscribe((event)=>{
        if(event instanceof NavigationEnd){
          const isConfig = event.url === '/config'
          const priv = event.url === '/private'
    
          if(isConfig){
            document.body.classList.add('config-view')
          }else{
            document.body.classList.remove('config-view')
          }
          if(priv){
            document.body.classList.add('admin')
          }
          else{
            document.body.classList.remove('admin')
          }
        }
      });
    }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart)=>{
      this.cart = _cart;
    })
    initFlowbite();
  }

  
}
