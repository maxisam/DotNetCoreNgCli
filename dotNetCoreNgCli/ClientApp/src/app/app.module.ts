import { BrowserTransferStateModule } from '../modules/transfer-state/browser-transfer-state.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ORIGIN_URL, REQUEST } from '@nguniversal/aspnetcore-engine';

export function getOriginUrl() {
  return window.location.origin;
}

export function getRequest() {
  // the Request object only lives on the server
  return { cookie: document.cookie };
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // To support Universal rendering. The application ID can be any identifier which is unique on the page.
    BrowserModule.withServerTransition({ appId: 'my-app-site' }),
    BrowserModule,
    BrowserTransferStateModule,
    AppRoutingModule

  ],
  providers: [{
    // We need this for our Http calls since they'll be using an ORIGIN_URL provided in main.server
    // (Also remember the Server requires Absolute URLs)
    provide: ORIGIN_URL,
    useFactory: getOriginUrl
  }, {
    // The server provides these in main.server
    provide: REQUEST,
    useFactory: getRequest
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
