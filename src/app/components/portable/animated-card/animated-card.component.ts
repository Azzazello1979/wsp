import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-animated-card',
  templateUrl: './animated-card.component.html',
  styleUrls: ['./animated-card.component.css'],
})
export class AnimatedCardComponent implements OnInit {
  apiBase: string = environment.backURL;
  @Input('product') product: Product;
  mouseEnter: boolean = false;

  constructor() {}

  onMouseEnter() {
    this.mouseEnter = true;
  }

  onMouseLeave() {
    this.mouseEnter = false;
  }

  constructImagePath(path: string): string {
    return `${this.apiBase}/${path}`;
  }

  ngOnInit(): void {}
}
