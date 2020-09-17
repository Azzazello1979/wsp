import {
  trigger,
  transition,
  style,
  query,
  animateChild,
  group,
  animate,
} from '@angular/animations';

export const routeTransitionAnimations = trigger('triggerName', [
  transition('One => Two', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
      }),
    ]),
    group([
      query(':leave', [animate('1s ease-out', style({ opacity: 0 }))]),
      query(':enter', [animate('1s ease-out', style({ opacity: 1 }))]),
    ]),
    query(':enter', animateChild()),
  ]),
]);
