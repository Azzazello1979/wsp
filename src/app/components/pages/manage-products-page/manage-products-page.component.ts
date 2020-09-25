import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { Subscription } from 'rxjs';
import { CentralService } from 'src/app/services/central.service';

@Component({
  selector: 'app-manage-products-page',
  templateUrl: './manage-products-page.component.html',
  styleUrls: ['./manage-products-page.component.css'],
})
export class ManageProductsPageComponent implements OnInit, OnDestroy {
  theForm: FormGroup;
  image: File;

  productCategories: ProductCategory[] = [];
  productCategoriesSub = new Subscription();

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private centralService: CentralService
  ) {}

  onFileSelected(event) {
    this.image = event.target.files[0];
  }

  onSubmit() {
    let body = new FormData();
    body.append('category', this.theForm.value.uploadProducts.category);
    body.append('name', this.theForm.value.uploadProducts.name);
    body.append('price', this.theForm.value.uploadProducts.price);
    body.append('description', this.theForm.value.uploadProducts.description);
    body.append('imagePath', this.theForm.value.uploadProducts.image);
    body.append('image', this.image);
    console.log(body);
    this.productService.saveProduct(body).subscribe(
      (response) => {
        console.log(response);
        this.centralService.busyOFF();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  subscribeToProductCategoriesChanges() {
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

  ngOnInit() {
    this.subscribeToProductCategoriesChanges();
    this.theForm = new FormGroup({
      uploadProducts: new FormGroup({
        category: new FormControl('none', Validators.required),
        name: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
        ]),
        price: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        image: new FormControl(null, Validators.required),
      }),
    });
  }

  ngOnDestroy() {
    this.productCategoriesSub.unsubscribe();
  }
}
