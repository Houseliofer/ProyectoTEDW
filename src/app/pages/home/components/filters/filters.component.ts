// filters.component.ts
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html'
})
export class FiltersComponent implements OnInit {
  @Output() showCategory = new EventEmitter<string | null>(); // Mantén el tipo como string | null
  categories: Category[] = [];
  selectedCategoryId: string | null = null;

  constructor(private apiCategory: CategoryService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.getCategories();
  }
onShowCategory(category: Category): void {
  this.selectedCategoryId = category._id;
  this.storeService.getProductCategory(this.selectedCategoryId).subscribe((products) => {
    this.showCategory.emit(this.selectedCategoryId); // Emitir el ID de la categoría
  });
}
  private getCategories(): void {
    this.apiCategory.getCategory().subscribe((data) => {
      this.categories = data;
    });
  }
}
