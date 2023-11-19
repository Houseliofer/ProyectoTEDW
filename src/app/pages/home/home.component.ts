  // home.component.ts
  import { Component, OnInit } from '@angular/core';
  import { Product } from 'src/app/models/product.model';
  import { StoreService } from 'src/app/services/store.service';
  import { CartService } from 'src/app/services/cart.service';
  import { SearchService } from 'src/app/services/search-service.service';

  const ROWS_HEIGHT: { [id: string]: number } = { 1: 400, 3: 335, 4: 350 };

  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
  })
  export class HomeComponent implements OnInit {
    cols = 3;
    rowHeight = ROWS_HEIGHT[this.cols];
    category: string | undefined;
    products: Product[] = [];
    searchKeyword: string = '';

    constructor(private storeService: StoreService, private cartService: CartService, private searchService:SearchService) {}
    
    ngOnInit(): void {
      this.loadProducts();
  
      // Suscribirse a cambios en el término de búsqueda
      this.searchService.searchKeyword$.subscribe(keyword => {
        this.searchKeyword = keyword;
        this.loadProducts();
      });
    }

    loadProducts() {
      if (this.searchKeyword.trim() !== '') {
        this.search();
      } else {
        this.storeService.getProducts().subscribe((data) => {
          this.products = data;
        });
      }
    }

    onColumnsCountChange(colsNum: number): void {
      this.cols = colsNum;
      this.rowHeight = ROWS_HEIGHT[this.cols];
    }

    onShowCategory(newCategory: string): void {
      this.category = newCategory;
    }

    onAddToCart(product: Product): void {
      this.cartService.addToCart({
        product: product.images,
        name: product.name,
        price: product.price,
        quantity: 1,
        id: product._id,
      });
    }
    search() {
      // Realizar la búsqueda
      this.storeService.searchRecipes(this.searchKeyword).subscribe((data) => {
        this.products = data;
      });
    }
  
  }
