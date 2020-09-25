import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/abstract/http.service';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/Product';
import { CentralService } from 'src/app/services/central.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends HttpService<Product> {
  products: Product[] = [];
  productsChanged = new BehaviorSubject<Product[]>(this.products);

  constructor(
    protected centralService: CentralService,
    protected http: HttpClient
  ) {
    super(centralService, http, 'products');
  }

  updateProductsWishStatus(id: number, wished: string): void {
    this.products.forEach((product) => {
      product.id === id ? (product.wished = wished) : null;
    });
    this.productsChanged.next(this.products);
  }

  updateWishedStatus(id: number) {
    return this.patch(id, 'Y');
  }

  saveProduct(productObject) {
    return this.post(productObject);
  }

  getProducts() {
    return this.getAll().subscribe(
      (response) => {
        this.products = [...response];
        this.productsChanged.next(this.products);
        this.centralService.busyOFF();
        console.log(this.products);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  productsObservable(): Observable<Product[]> {
    return this.productsChanged.asObservable();
  }
}
