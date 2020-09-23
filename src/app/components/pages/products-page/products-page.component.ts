import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productsSub = new Subscription();

  constructor(private productService: ProductService) {}

  fillProducts() {
    this.productsSub = this.productService.getProducts().subscribe(
      (response) => {
        this.products = [...response];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.fillProducts();
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }
}
