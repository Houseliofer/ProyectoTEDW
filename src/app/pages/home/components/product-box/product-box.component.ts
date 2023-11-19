import { Component, EventEmitter, Input, Output,OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html'
})
export class ProductBoxComponent{
  products: Product[] = []

  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;

  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart(): void {
    if (this.product) {
      this.addToCart.emit(this.product);
    }
  }

}
