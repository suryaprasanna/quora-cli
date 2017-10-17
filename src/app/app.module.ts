import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MdButtonModule, MdListModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MatGridListModule, MatInputModule, MdTabsModule, MatExpansionModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AnswerComponent } from './answer/answer.component';

import { HomeService } from './home.service';

export const router: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: LoginComponent },
  { path: 'answers', component: AnswerComponent}
   ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AnswerComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdListModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MatInputModule,
    MdTabsModule,
    MatExpansionModule,
    RouterModule.forRoot(
      router,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ HomeService ],
  bootstrap: [ 
    AppComponent,
    HomeComponent,
    LoginComponent,
    AnswerComponent
  ]
})
export class AppModule { }
