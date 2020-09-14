import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {
  public loader: Subject<boolean> = new Subject<boolean>();
  private loaderList: string[] = [];

  toggleLoader(toggleSetting: boolean) {
    if (toggleSetting) {
      this.loaderList.push('');
    } else {
      this.loaderList.pop();
    }
    if (this.loaderList.length === 0) {
      this.loader.next(false);
    } else {
      this.loader.next(true);
    }
  }
}