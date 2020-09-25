import { Component, Input, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models/ProductCategory';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent implements OnInit {
  @Input('productCategories') productCategories: ProductCategory[] = [];
  minPrice: number = 0;
  maxPrice: number = 0;
  selectedCategory: string = 'none';
  constructor() {}

  onCategorySelect(event) {
    this.selectedCategory = event.target.value;
  }

  ngOnInit(): void {}
}
