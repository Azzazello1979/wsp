import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Card } from 'src/app/components/pages/dashboard-page/dashboard-page.component';

@Component({
  selector: 'app-sidenav-tile',
  templateUrl: './sidenav-tile.component.html',
  styleUrls: ['./sidenav-tile.component.css'],
})
export class SidenavTileComponent implements OnInit, AfterViewInit {
  @Input('sideNavExpanded') sideNavExpanded: boolean = false;

  @Input('cards')
  cards: Card[] = [];
  @ViewChild('L1') L1: ElementRef;
  currentNaviWidth: string = '';

  calculateCurrentNaviWidth() {
    this.currentNaviWidth = this.L1.nativeElement.clientWidth.toString() + 'px';
  }

  onL1Click(id: number) {
    this.cards.forEach((card) => {
      card.id === id
        ? (card.selected = !card.selected)
        : (card.selected = false);
    });
    //console.log(this.L1.nativeElement.clientWidth);
    this.calculateCurrentNaviWidth();
  }

  onL2Click(id: number) {
    this.cards.forEach((card) => {
      if (card.selected) {
        card.children.forEach((subCard) => {
          subCard.id === id
            ? (subCard.selected = true)
            : (subCard.selected = false);
        });
      } else {
        card.children.forEach((subCard) => {
          subCard.selected = false;
        });
      }
    });
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.calculateCurrentNaviWidth();
  }
}
