import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlidebarComponent } from './modules/slidebar/slidebar.component';
import { ScrollToTopComponent } from './modules/scroll-to-top/scroll-to-top.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { RegisterComponent } from './modules/authentication/register/register.component';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  declarations: [
    AppComponent,
    SlidebarComponent,
    ScrollToTopComponent,
    LoginComponent,
    RegisterComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
