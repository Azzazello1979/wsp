import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { environment } from 'src/environments/environment';

export interface ProductCardEvent {
  id: number;
  event: string;
  wishedStatus?: string;
}

@Component({
  selector: 'app-animated-card',
  templateUrl: './animated-card.component.html',
  styleUrls: ['./animated-card.component.css'],
})
export class AnimatedCardComponent implements OnInit {
  apiBase: string = environment.backURL;
  mouseInside: boolean = false;
  /* wished: boolean = false; */
  @Input('product') product: Product;
  @Output() productCardEvent = new EventEmitter();

  constructor() {}

  returnWishedStatus(): string {
    return this.product.wished === 'Y'
      ? (this.product.wished = 'N')
      : (this.product.wished = 'Y');
  }

  onToolClick(intent: string) {
    intent === 'cart'
      ? this.productCardEvent.emit({
          id: this.product.id as number,
          event: 'cartUpdated',
        })
      : intent === 'info'
      ? this.productCardEvent.emit({
          id: this.product.id as number,
          event: 'infoRequired',
        })
      : intent === 'wish'
      ? this.productCardEvent.emit({
          id: this.product.id as number,
          event: 'productWished',
          wishedStatus: this.returnWishedStatus(),
        })
      : null;
  }

  onMouseEnter() {
    this.mouseInside = true;
  }

  onMouseLeave() {
    this.mouseInside = false;
  }

  constructImagePath(path: string): string {
    return `${this.apiBase}/${path}`;
  }

  ngOnInit(): void {}
}
