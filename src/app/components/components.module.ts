import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasForcedComponent } from './canvas-forced/canvas-forced.component';
import {ServicesModule} from './svg-forced/services/services.module';
import { SvgForcedComponent } from './svg-forced/svg-forced.component';
import { BothComponent } from './both/both.component';

@NgModule({
  imports: [
    CommonModule,
    ServicesModule
  ],
  declarations: [CanvasForcedComponent, SvgForcedComponent, BothComponent],
  exports: [BothComponent, CanvasForcedComponent, SvgForcedComponent]
})
export class ComponentsModule { }
