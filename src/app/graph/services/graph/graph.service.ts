import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class GraphService {
  private showImage: boolean;
  private showImageObserver: BehaviorSubject<boolean>;
  private showText: boolean;
  private showTextObserver: BehaviorSubject<boolean>;

  constructor() {
    this.showImage = false;
    this.showImageObserver = new BehaviorSubject(this.showImage);

    this.showText = false;
    this.showTextObserver = new BehaviorSubject(this.showText);
  }

  toggleShowImage() {
    this.showImage = !this.showImage;
    this.showImageObserver.next(this.showImage);
  }

  getShowImage(): BehaviorSubject<boolean> {
    return this.showImageObserver;
  }

  toggleShowText() {
    this.showText = !this.showText;
    this.showTextObserver.next(this.showText);
  }

  getShowText(): BehaviorSubject<boolean> {
    return this.showTextObserver;
  }
}
