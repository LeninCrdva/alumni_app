import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { LayoutBaseComponent } from './layout/layout-client/layout-base.component';
import { LayoutSystemComponent } from './layout/layout-system/layout-system.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  declarations: [
    AppComponent,
    LayoutBaseComponent,
    LayoutSystemComponent,
    ScrollToTopComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
