import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';  // Ajusta la ruta
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html'
})
export class FiltersComponent implements OnInit {
  @Output() showCategory = new EventEmitter<string>();
  categories: Category[] = [];

  constructor(private apiCategory: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

  private getCategories(): void {
    this.apiCategory.getCategory().subscribe((data)=>{
       this.categories=data
    })
  }
}
