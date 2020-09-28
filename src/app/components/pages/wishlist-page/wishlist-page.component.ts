import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CentralService } from 'src/app/services/central.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css'],
})
export class WishlistPageComponent implements OnInit, OnDestroy {
  apiBase: string = environment.backURL;
  products: Product[] = [];
  productsSub = new Subscription();

  deletedWishId: number = 0;

  wishedProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private centralService: CentralService
  ) {}

  removeWish(id: number) {
    this.deletedWishId = id;

    console.log('deletedWishId: ' + this.deletedWishId);
    console.log('incoming id: ' + id);

    setTimeout(() => {
      this.wishedProducts = [
        ...this.wishedProducts.filter((product) => product.id !== id),
      ];
      this.productService.updateWishedStatus(id, 'N').subscribe(
        (response) => {
          this.centralService.busyOFF();
          console.log(response);
        },
        (err) => {
          console.log(err);
        }
      );
    }, 500);
  }

  constructImagePath(path: string): string {
    return `${this.apiBase}/${path}`;
  }

  fillWishedProducts(): void {
    this.wishedProducts = [
      ...this.products.filter((product) => product.wished === 'Y'),
    ];
  }

  subscribeToProducts() {
    this.productsSub = this.productService.productsChanged.subscribe(
      (news) => {
        this.products = [...news];
        this.fillWishedProducts();
      },
      (err) => console.log(err)
    );
  }

  ngOnInit() {
    this.subscribeToProducts();
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }
}
