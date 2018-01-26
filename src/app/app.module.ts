import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {appRouter} from './app.router';
import {GraphModule} from './graph/graph.module';
import {ServicesModule} from './graph/services/services.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    appRouter,
    BrowserModule,
    GraphModule,
    RouterModule,
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
