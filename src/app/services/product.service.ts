import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/abstract/http.service';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends HttpService<Product> {
  constructor(protected http: HttpClient) {
    super(http, 'products');
  }

  saveProduct(productObject) {
    return this.post(productObject);
  }

  getProducts() {
    return this.getAll();
  }
}
