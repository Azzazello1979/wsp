import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/components/pages/dashboard-page/dashboard-page.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidenav-tile',
  templateUrl: './sidenav-tile.component.html',
  styleUrls: ['./sidenav-tile.component.css'],
})
export class SidenavTileComponent implements OnInit {
  @Input('sideNavExpanded') sideNavExpanded: boolean;
  @Input('cards')
  cards: Card[] = [];

  constructor(private route: ActivatedRoute) {}

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

  ngOnInit() {
    //console.log(this.route.snapshot.children[0].routeConfig.path);
  }
}
