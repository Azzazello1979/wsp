import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-tile',
  templateUrl: './navigation-tile.component.html',
  styleUrls: ['./navigation-tile.component.css'],
})
export class NavigationTileComponent implements OnInit {
  animated: boolean = false;
  @Output() navTileClicked = new EventEmitter<string>();

  @Input() name: string;
  @Input() icon: string;
  @Input() path: string;

  onClick() {
    this.navTileClicked.emit(this.path as string);
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
