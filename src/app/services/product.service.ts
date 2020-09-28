import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/abstract/http.service';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/Product';
import { CentralService } from 'src/app/services/central.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductCardEvent } from 'src/app/components/portable/animated-card/animated-card.component';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends HttpService<Product> {
  products: Product[] = []; // full list of products from DB, do not show this on product-page!
  productsChanged = new BehaviorSubject<Product[]>(this.products);

  filteredProducts: Product[] = []; // show this on product-page!
  filteredProductsChanged = new BehaviorSubject<Product[]>(
    this.filteredProducts
  );

  constructor(
    protected centralService: CentralService,
    protected http: HttpClient
  ) {
    super(centralService, http, 'products');
  }

  filterProducts(minPrice: number, maxPrice: number, category: string) {
    if (category === 'none') {
      let filtered = this.products.filter(
        (product) => product.price < maxPrice && product.price > minPrice
      );
      this.filteredProducts = [...filtered];
      this.filteredProductsChanged.next(this.filteredProducts);
    } else {
      let filtered = this.products.filter(
        (product) =>
          product.category === category &&
          product.price < maxPrice &&
          product.price > minPrice
      );
      this.filteredProducts = [...filtered];
      this.filteredProductsChanged.next(this.filteredProducts);
    }
  }

  onProductFilterBarEmission(event) {
    this.filterProducts(event.minPrice, event.maxPrice, event.category);
  }

  onProductCardEvent(event: ProductCardEvent) {
    if (event.event === 'productWished') {
      console.log(event);
      this.updateWishedStatus(event.id, event.wishedStatus).subscribe(
        (response) => {
          console.log(response);
          this.centralService.busyOFF();
        },
        (err) => {
          this.centralService.busyOFF();
          return console.log(err);
        }
      );
    }
  }

  // local
  updateProductsWishStatus(id: number, wished: string): void {
    this.products.forEach((product) => {
      product.id === id ? (product.wished = wished) : null;
    });
    this.productsChanged.next(this.products);
  }

  // in DB
  updateWishedStatus(id: number, wishedStatus: string) {
    return this.patch(id, { wishedStatus });
  }

  saveProduct(productObject) {
    return this.post(productObject);
  }

  getProducts() {
    return this.getAll().subscribe(
      (response) => {
        //console.log(response);
        this.products = [...response];
        this.productsChanged.next(this.products);
        this.filteredProducts = [...this.products];
        this.filteredProductsChanged.next(this.filteredProducts);
        this.centralService.busyOFF();
      },
      (err) => {
        this.centralService.busyOFF();
        return console.log(err);
      }
    );
  }

  productsObservable(): Observable<Product[]> {
    return this.productsChanged.asObservable();
  }

  filteredProductsObservable(): Observable<Product[]> {
    return this.filteredProductsChanged.asObservable();
  }
}
