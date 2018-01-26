import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServicesModule} from './services/services.module';
import {SvgForcedComponent} from './svg-forced/svg-forced.component';

@NgModule({
  imports: [
    CommonModule,
    ServicesModule
  ],
  declarations: [SvgForcedComponent],
  exports: [SvgForcedComponent]
})
export class GraphModule { }
