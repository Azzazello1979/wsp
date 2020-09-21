import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productsSub = new Subscription();
  apiBase: string = environment.backURL;

  constructor(private productService: ProductService) {}

  constructImagePath(path: string): string {
    return `${this.apiBase}/${path}`;
  }

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
