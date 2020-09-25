import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { CentralService } from 'src/app/services/central.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productsSub = new Subscription();

  constructor(
    private centralService: CentralService,
    private productService: ProductService
  ) {}

  fillProducts() {
    this.productsSub = this.productService.getProducts().subscribe(
      (response) => {
        this.products = [...response];
        this.centralService.busyOFF();
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
