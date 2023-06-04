import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CategoryModel } from './models/category.model';
import { FilteredCategories } from './models/filtered-categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private _httpClient: HttpClient) {}

  createCategory(category: CategoryModel): Observable<any> {
    return this._httpClient.post(`${environment.url}/category/create-category`, category);
  }

  updateCategory(id: string, category: CategoryModel): Observable<any> {
    return this._httpClient.put(`${environment.url}/category/update-category/${id}`, category);
  }

  deleteCategory(id: string): Observable<any> {
    return this._httpClient.delete(`${environment.url}/category/delete-category/${id}`);
  }

  getPaginatedFilteredCategories(pageSize: number, pageIndex: number, query): Observable<FilteredCategories> {
    return this._httpClient.get<FilteredCategories>(`${environment.url}/category/filtered/${pageSize}/${pageIndex}`, { params: query });
  }
}
