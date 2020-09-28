import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { CentralService } from 'src/app/services/central.service';
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
  products: Product[] = [];
  productsSub = new Subscription();

  productCategories: ProductCategory[] = [];
  productCategoriesSub = new Subscription();

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private centralService: CentralService
  ) {}

  onProductCardEvent(event: ProductCardEvent) {
    this.productService.onProductCardEvent(event);
  }

  filterProducts(minPrice: number, maxPrice: number, category: string) {
    if (category === 'none') {
      let filtered = this.products.filter(
        (product) => product.price < maxPrice && product.price > minPrice
      );
      return (this.filteredProducts = [...filtered]);
    } else {
      let filtered = this.products.filter(
        (product) =>
          product.category === category &&
          product.price < maxPrice &&
          product.price > minPrice
      );
      return (this.filteredProducts = [...filtered]);
    }
  }

  onFilterBarEmission(event) {
    this.filterProducts(event.minPrice, event.maxPrice, event.category);
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
        this.filteredProducts = [...news];
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
