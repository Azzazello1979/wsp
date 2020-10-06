import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  animate: boolean = false;
  boardGames: Array<object> = [
    {
      image: 'assets/slides/board-game/front/board-1-b.jpg',
      thumbImage: 'assets/slides/board-game/thumb/board-1-t.jpg',
      alt: '',
      title: 'Smashing!',
    },
    {
      image: 'assets/slides/board-game/front/board-2-b.jpg',
      thumbImage: 'assets/slides/board-game/thumb/board-2-t.jpg',
      alt: '',
      title: 'Exciting!',
    },
    {
      image: 'assets/slides/board-game/front/board-3-b.jpg',
      thumbImage: 'assets/slides/board-game/thumb/board-3-t.jpg',
      alt: '',
      title: 'Exhilarating!',
    },
    {
      image: 'assets/slides/board-game/front/board-4-b.jpg',
      thumbImage: 'assets/slides/board-game/thumb/board-4-t.jpg',
      alt: '',
      title: 'Interesting!',
    },
  ];

  constructor() {}

  addAnims() {
    /* this.animate = true; */
  }

  ngOnInit(): void {}
}
