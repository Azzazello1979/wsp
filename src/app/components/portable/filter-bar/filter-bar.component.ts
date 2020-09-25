import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent implements OnInit, AfterViewInit {
  @Input('productCategories') productCategories: ProductCategory[] = [];
  theForm: FormGroup;
  @Output() filterBarEmitted = new EventEmitter();

  constructor() {}

  ngAfterViewInit() {
    this.theForm.controls.form.valueChanges.subscribe(() => {
      let values = this.theForm.get('form').value;
      this.filterBarEmitted.emit(values);
    });
  }

  ngOnInit() {
    this.theForm = new FormGroup({
      form: new FormGroup({
        minPrice: new FormControl(0),
        maxPrice: new FormControl(0),
        category: new FormControl('category'),
      }),
    });
  }
}
