import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/abstract/http.service';
import { HttpClient } from '@angular/common/http';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { BehaviorSubject, Observable } from 'rxjs';
import { CentralService } from 'src/app/services/central.service';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService extends HttpService<ProductCategory> {
  productCategories: ProductCategory[] = [];
  productCategoriesChanged = new BehaviorSubject<ProductCategory[]>(
    this.productCategories
  );

  constructor(
    protected centralService: CentralService,
    protected http: HttpClient
  ) {
    super(centralService, http, 'categories');
  }

  productCategoriesObservable(): Observable<ProductCategory[]> {
    return this.productCategoriesChanged.asObservable();
  }

  getProductCategories(): void {
    this.getAll().subscribe(
      (response) => {
        this.productCategories = [...response];
        this.productCategoriesChanged.next(this.productCategories);
        this.centralService.busyOFF();
      },
      (err) => {
        this.centralService.busyOFF();
        return console.log(err);
      }
    );
  }
}
