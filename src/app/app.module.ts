import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {ComponentsModule} from './components/components.module';
import {ServicesModule} from './components/svg-forced/services/services.module';
import {RouterModule} from '@angular/router';
import {appRouter} from './app.router';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    appRouter,
    BrowserModule,
    ComponentsModule,
    RouterModule,
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
