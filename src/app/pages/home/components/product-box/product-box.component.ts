import { Component, EventEmitter, Input, Output,OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html'
})
export class ProductBoxComponent{
  isLoggedIn: boolean = false; 
  products: Product[] = []

  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;

  @Output() addToCart = new EventEmitter<Product>();

  constructor(
      private router: Router
  ) { }

  onAddToCart(): void {
    if (this.product) {
      this.addToCart.emit(this.product);
    }
  }

  onCardClick(): void {
    if (this.product && this.product._id) {
      this.router.navigate(['/product-detail', this.product._id]);
    }
  }
}
