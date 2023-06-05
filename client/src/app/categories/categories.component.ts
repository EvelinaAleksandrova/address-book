import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MenuType } from '../shared/enums';
import { CategoriesService } from './categories.service';
import { modalMessages } from '../shared/messages';
import { ModalComponent } from '../shared/modal/modal.component';
import { ModalCategoryComponent } from './modal-category/modal-category.component';
import { CategoryModel } from './models/category.model';
import { SearchCategory } from './models/category-search.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  menuType: string = '';
  currentCategoryId: string = '';

  isLoading: boolean = true;

  displayedColumns: string[] = ['label', 'note', 'button'];
  filters: { name: string; value: string }[] = [];

  filterNames: { code: string; label: string }[] = [
    { code: 'category', label: 'Category' },
    { code: 'note', label: 'Note' }
  ];

  categoriesData: any[] = [];

  tableSize: number = 0;
  pageSize: number = 10;

  categoriesDataSource: MatTableDataSource<CategoryModel> = new MatTableDataSource();

  constructor(private categoriesService: CategoriesService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCategoriesData();
  }

  getCategoriesData(goToFirstPage = false) {
    this.isLoading = true;
    goToFirstPage && !!this.paginator && (this.paginator.pageIndex = 0);

    const pageSize = this.paginator?.pageSize || 10;
    const pageIndex = this.paginator?.pageIndex || 0;
    const query: SearchCategory = {};

    for (let filter of this.filters) {
      query[filter.name] = filter.value;
    }

    this.categoriesService.getPaginatedFilteredCategories(pageSize, pageIndex, query).subscribe({
      next: res => {
        this.categoriesDataSource.data = res.filteredRecords;
        this.tableSize = res.count;
        this.pageSize = pageSize;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }

  openCategoryModal() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      msg: { title: modalMessages.CREATE_CATEGORY },
      action: MenuType.create
    };

    dialogConfig.width = '50%';

    const dialogRef = this.dialog.open(ModalCategoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getCategoriesData(true);
      }
    });
  }

  openSearch() {}

  editCategory(category: CategoryModel) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      msg: { title: modalMessages.EDIT_CATEGORY },
      action: MenuType.edit,
      category: category
    };

    dialogConfig.width = '50%';

    const dialogRef = this.dialog.open(ModalCategoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getCategoriesData(true);
      }
    });
  }

  deleteCategory(category: CategoryModel) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      msg: { title: modalMessages.DELETE_CATEGORY }
    };
    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.isLoading = true;
        this.categoriesService.deleteCategory(category.code).subscribe({
          next: res => {
            this.getCategoriesData(true);
          },
          error: () => (this.isLoading = false)
        });
      }
    });
  }
}
