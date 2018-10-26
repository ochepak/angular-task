import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ListComponent} from './list/list.component';
import { PopupComponent } from './list/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    PopupComponent
  ]
})
export class AppModule { }
