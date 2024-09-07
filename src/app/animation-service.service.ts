import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimationServiceService {

  constructor() { }
  showAnimationSource = new BehaviorSubject<boolean>(false);
  showAnimation$ = this.showAnimationSource.asObservable();

  setShowAnimation(show: boolean) {
    this.showAnimationSource.next(show);
  }
}
