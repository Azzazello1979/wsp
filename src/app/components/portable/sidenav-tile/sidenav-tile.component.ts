import { Component, Input } from '@angular/core';
import { Card } from 'src/app/components/pages/dashboard-page/dashboard-page.component';

@Component({
  selector: 'app-sidenav-tile',
  templateUrl: './sidenav-tile.component.html',
  styleUrls: ['./sidenav-tile.component.css'],
})
export class SidenavTileComponent {
  @Input('sideNavExpanded') sideNavExpanded: boolean;
  @Input('cards')
  cards: Card[] = [];

  onL1Click(id: number) {
    this.cards.forEach((card) => {
      card.id === id ? (card.selected = true) : (card.selected = false);
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
}
