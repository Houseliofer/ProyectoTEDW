import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
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
    private productService: StoreService
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

  isRopaCategory():boolean {
    return this.category && this.category.category && this.category.category.categoria == 'Ropa';
  }
}
