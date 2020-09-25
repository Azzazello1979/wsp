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
  products: Product[] = [];
  productsSub = new Subscription();

  wishedProducts: Product[] = [];

  constructor(private productService: ProductService) {}

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
