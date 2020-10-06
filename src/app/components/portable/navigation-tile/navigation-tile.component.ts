import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NavigationTile } from 'src/app/models/NavigationTile';

@Component({
  selector: 'app-navigation-tile',
  templateUrl: './navigation-tile.component.html',
  styleUrls: ['./navigation-tile.component.css'],
})
export class NavigationTileComponent implements OnInit {
  animated: boolean = false;
  @Output() navTileClicked = new EventEmitter<string>();

  @Input() tile: NavigationTile;

  onClick() {
    this.navTileClicked.emit(this.tile.path as string);
  }

  playAnim() {
    this.animated = true;
    setTimeout(() => {
      this.animated = false;
    }, 2000);
  }

  constructor() {}

  ngOnInit(): void {}
}
