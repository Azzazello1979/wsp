import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { ProductCardEvent } from 'src/app/components/portable/animated-card/animated-card.component';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  filteredProducts: Product[] = []; // SHOWING THIS
  filteredProductsSub = new Subscription();
  products: Product[] = [];
  productsSub = new Subscription();

  productCategories: ProductCategory[] = [];
  productCategoriesSub = new Subscription();

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {}

  onProductCardEvent(event: ProductCardEvent) {
    this.productService.onProductCardEvent(event);
  }

  onFilterBarEmission(event) {
    this.productService.onProductFilterBarEmission(event);
  }

  subscribeToProductCategories() {
    this.productCategoriesSub = this.productCategoryService
      .productCategoriesObservable()
      .subscribe(
        (news) => {
          this.productCategories = [...news];
        },
        (err) => {
          return console.log(err);
        }
      );
  }

  subscribeToProductsChanges() {
    this.productsSub = this.productService.productsObservable().subscribe(
      (news) => {
        this.products = [...news];
      },
      (err) => {
        return console.log(err);
      }
    );
  }

  subscribeToFilteredProductsChanges() {
    this.filteredProductsSub = this.productService
      .filteredProductsObservable()
      .subscribe(
        (news) => {
          this.filteredProducts = [...news];
        },
        (err) => {
          return console.log(err);
        }
      );
  }

  ngOnInit() {
    this.subscribeToProductsChanges();
    this.subscribeToFilteredProductsChanges();
    this.subscribeToProductCategories();
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
    this.filteredProductsSub.unsubscribe();
    this.productCategoriesSub.unsubscribe();
  }
}
