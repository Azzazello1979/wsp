import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/abstract/http.service';
import { HttpClient } from '@angular/common/http';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService extends HttpService<ProductCategory> {
  constructor(protected http: HttpClient) {
    super(http, 'categories');
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.getAll().pipe(delay(1000)); // delay just to show spinner :-)
  }
}
