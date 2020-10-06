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
    {
      image: 'assets/slides/board-game/front/board-5-b.jpg',
      thumbImage: 'assets/slides/board-game/thumb/board-5-t.jpg',
      alt: '',
      title: 'Challenging!',
    },
  ];
  wines: Array<object> = [
    {
      image: 'assets/slides/wine/front/wine-1-b.jpg',
      thumbImage: 'assets/slides/wine/thumb/wine-1-t.jpg',
      alt: '',
      title: 'Smashing!',
    },
    {
      image: 'assets/slides/wine/front/wine-2-b.jpg',
      thumbImage: 'assets/slides/wine/thumb/wine-2-t.jpg',
      alt: '',
      title: 'Exciting!',
    },
    {
      image: 'assets/slides/wine/front/wine-3-b.jpg',
      thumbImage: 'assets/slides/wine/thumb/wine-3-t.jpg',
      alt: '',
      title: 'Exhilarating!',
    },
    {
      image: 'assets/slides/wine/front/wine-4-b.jpg',
      thumbImage: 'assets/slides/wine/thumb/wine-4-t.jpg',
      alt: '',
      title: 'Interesting!',
    },
    {
      image: 'assets/slides/wine/front/wine-5-b.jpg',
      thumbImage: 'assets/slides/wine/thumb/wine-5-t.jpg',
      alt: '',
      title: 'Tasty!',
    },
  ];
  books: Array<object> = [
    {
      image: 'assets/slides/book/front/book-1-b.jpg',
      thumbImage: 'assets/slides/book/thumb/book-1-t.jpg',
      alt: '',
      title: 'Smashing!',
    },
    {
      image: 'assets/slides/book/front/book-2-b.jpg',
      thumbImage: 'assets/slides/book/thumb/book-2-t.jpg',
      alt: '',
      title: 'Exciting!',
    },
    {
      image: 'assets/slides/book/front/book-3-b.jpg',
      thumbImage: 'assets/slides/book/thumb/book-3-t.jpg',
      alt: '',
      title: 'Exhilarating!',
    },
    {
      image: 'assets/slides/book/front/book-4-b.jpg',
      thumbImage: 'assets/slides/book/thumb/book-4-t.jpg',
      alt: '',
      title: 'Interesting!',
    },
    {
      image: 'assets/slides/book/front/book-5-b.jpg',
      thumbImage: 'assets/slides/book/thumb/book-5-t.jpg',
      alt: '',
      title: 'Entertaining!',
    },
  ];

  constructor() {}

  addAnims() {
    /* this.animate = true; */
  }

  ngOnInit(): void {}
}
