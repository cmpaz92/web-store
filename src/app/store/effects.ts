import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';

@Injectable()
export class ShopEffects {

  constructor(
    private actions$: Actions,
  ) {
  }
}
