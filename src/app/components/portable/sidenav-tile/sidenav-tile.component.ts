import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/components/pages/dashboard-page/dashboard-page.component';

@Component({
  selector: 'app-sidenav-tile',
  templateUrl: './sidenav-tile.component.html',
  styleUrls: ['./sidenav-tile.component.css'],
})
export class SidenavTileComponent implements OnInit {
  @Input('sideNavExpanded') sideNavExpanded: boolean = false;
  @Input('cards') cards: Card[] = [];

  onL1Click(id: number) {
    this.cards.forEach((card) => {
      card.id === id
        ? (card.selected = !card.selected)
        : (card.selected = false);
    });
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
}
