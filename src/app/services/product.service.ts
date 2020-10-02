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

  wishedProducts: Product[] = [];
  wishedProductsChanged = new BehaviorSubject<Product[]>(this.wishedProducts);

  constructor(
    protected centralService: CentralService,
    protected http: HttpClient
  ) {
    super(centralService, http, 'products');
  }

  getAllProducts(){
    return this.products;
  }

  wishedProductsObservable() {
    return this.wishedProductsChanged.asObservable();
  }

  removeWish(id: number) {
    setTimeout(() => {
      // timeout, to be able to show animation first
      this.updateWishedStatus(id, 'N').subscribe(
        (response) => {
          this.centralService.busyOFF();
          this.updateProductsWishStatus(parseInt(response.id), response.wished);
          this.wishedProducts = this.products.filter(
            (product) => product.wished === 'Y'
          );
          console.log(this.wishedProducts);
          this.wishedProductsChanged.next(this.wishedProducts);
        },
        (err) => {
          return console.log(err);
        }
      );
    }, 500);
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

  onProductWished(event: ProductCardEvent) {
    console.log(event);
    this.updateWishedStatus(event.id, event.wishedStatus).subscribe(
      (response) => {
        console.log(response);
        this.updateProductsWishStatus(event.id, event.wishedStatus);
        this.centralService.busyOFF();
      },
      (err) => {
        this.centralService.busyOFF();
        return console.log(err);
      }
    );
  }

  // local
  updateProductsWishStatus(id: number, wished: string): void {
    console.log('updating wish status');
    this.products.forEach((product) => {
      product.id === id ? (product.wished = wished) : null;
    });
    this.productsChanged.next(this.products);
    this.wishedProducts = [
      ...this.products.filter((product) => product.wished === 'Y'),
    ];
    this.wishedProductsChanged.next(this.wishedProducts);
    console.log(this.wishedProducts);
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
        this.wishedProducts = this.products.filter(
          (product) => product.wished === 'Y'
        );
        this.wishedProductsChanged.next(this.wishedProducts);
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
