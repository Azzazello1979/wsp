import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductCategory } from 'src/app/models/ProductCategory';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productsSub = new Subscription();

  productCategories: ProductCategory[] = [];
  productCategoriesSub = new Subscription();

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {}

  onFilterBarEmission(event) {
    console.log(event);
  }

  subscribeToProductCategories() {
    this.productCategoriesSub = this.productCategoryService
      .productCategoriesObservable()
      .subscribe(
        (news) => {
          this.productCategories = [...news];
        },
        (err) => {
          console.log(err);
        }
      );
  }

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
    this.subscribeToProductCategories();
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
    this.productCategoriesSub.unsubscribe();
  }
}
