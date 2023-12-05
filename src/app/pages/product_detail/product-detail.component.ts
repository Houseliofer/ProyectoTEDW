import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [
  ]
})
export class ProductDetailComponent {

  product: any = null;
  category:any = null;

  constructor(
    private route: ActivatedRoute,
    private productService: StoreService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe(product => {
        console.log(product);
        this.product = product;

        if (this.product.product.category) {
          this.productService.getCategoryById(this.product.product.category).subscribe(category => {
            //console.log(category);
            this.category = category;
            //console.log(this.category);
          }, error => {
            console.log(error);
          });
        }
      });
    }
  }

  onAddToCart(): void {
    const item: CartItem = {
      product: this.product.product.images[0],
      id: this.product.product._id,
      name: this.product.product.name,
      price: this.product.product.price,
      quantity: 1,
    };
    this.cartService.addToCart(item);
  }

  isRopaCategory():boolean {
    return this.category && this.category.category && this.category.category.categoria == 'Ropa';
  }
}
