import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

export interface ProductCategory {
  id: number;
  name: string;
}

@Component({
  selector: 'app-manage-products-page',
  templateUrl: './manage-products-page.component.html',
  styleUrls: ['./manage-products-page.component.css'],
})
export class ManageProductsPageComponent implements OnInit {
  theForm: FormGroup;
  image: File;

  productCategories: ProductCategory[] = [
    { id: 0, name: 'none' },
    { id: 1, name: 'coffee' },
    { id: 2, name: 'board game' },
    { id: 3, name: 'book' },
  ];

  constructor(private productService: ProductService) {}

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
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
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
}
