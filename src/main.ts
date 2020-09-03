import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

import {default as localForage, getAllDataFromLocalForage,} from 'ngrx-store-persist';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


getAllDataFromLocalForage({
  driver: localForage.LOCALSTORAGE,
  keys: [
    'loggedUser',
    'shopping'
  ],
}).then(() => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.log(err));
});
