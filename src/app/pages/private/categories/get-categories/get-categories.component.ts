import { Component, Renderer2, ChangeDetectorRef, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-get-categories',
  templateUrl: './get-categories.component.html',
  styles: [
  ]
})
export class GetCategoriesComponent implements OnInit {
  categories: Category[] = [];
  showTable: boolean = true;
  showAddCategoryForm: boolean = false;
  // get-categories.component.ts
editingCategory: Category | null = null;


  constructor(
    private category: CategoryService,
    private renderer: Renderer2,
    private _snackbar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    /*if (window.location.pathname === '/private') {
      this.renderer.addClass(document.body, 'admin');
    } else {
      this.renderer.removeClass(document.body, 'admin');
    }*/
    this.getCategories();
  }

  private getCategories(): void {
    this.category.getCategory().subscribe((data) => {
      this.categories = data;
    });
  }

  deleteCategory(id: string): void {
    this.category.deleteCategory(id).subscribe(
      (response) => {
        console.log('Category deleted successfully', response);
        this.getCategories();
        this._snackbar.open('action success', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        this._snackbar.open('Error deleting category', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  toggleAddCategoryForm() {
    this.showTable = !this.showTable;
    this.showAddCategoryForm = !this.showAddCategoryForm;
  }

  onFormSubmit() {    
    this.showTable = true;
    this.showAddCategoryForm = false;
    this.editingCategory = null;
    this.getCategories();
  }
  editCategory(category: Category) {
    this.showTable = false;
    this.showAddCategoryForm = true;
    this.editingCategory = category;
  }
  
}
