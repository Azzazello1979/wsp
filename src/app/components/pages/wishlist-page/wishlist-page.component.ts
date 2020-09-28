import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css'],
})
export class WishlistPageComponent implements OnInit, OnDestroy {
  apiBase: string = environment.backURL;

  deletedWishId: number = 0;
  wishedProducts: Product[] = [];
  wishedProductsSub = new Subscription();

  constructor(private productService: ProductService) {}

  removeWish(id: number) {
    this.deletedWishId = id;
    this.productService.removeWish(id);
  }

  constructImagePath(path: string): string {
    return `${this.apiBase}/${path}`;
  }

  ngOnInit() {
    this.wishedProductsSub = this.productService
      .wishedProductsObservable()
      .subscribe((wishedProducts) => {
        this.wishedProducts = [...wishedProducts];
        console.log('wishedProduct:', this.wishedProducts);
      });
  }

  ngOnDestroy() {
    this.wishedProductsSub.unsubscribe();
  }
}
