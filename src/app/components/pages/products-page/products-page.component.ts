import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productsSub = new Subscription();

  constructor(private productService: ProductService) {}

  subscribeToProductsChanges() {
    this.productsSub = this.productService.productsObservable().subscribe(
      (news) => {
        this.products = [...news];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.subscribeToProductsChanges();
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }
}
