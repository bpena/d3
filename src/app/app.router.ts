import {RouterModule, Routes} from '@angular/router';
import {BothComponent} from './components/both/both.component';
import {CanvasForcedComponent} from './components/canvas-forced/canvas-forced.component';
import {SvgForcedComponent} from './components/svg-forced/svg-forced.component';
import {ModuleWithProviders} from '@angular/core';


const ROUTES: Routes = [
  // { path: '', component: BothComponent },
  { path: '', component: CanvasForcedComponent},
  { path: 'only-canvas', component: CanvasForcedComponent},
  { path: 'only-svg', component: SvgForcedComponent }
];

export const appRouter: ModuleWithProviders = RouterModule.forRoot(ROUTES);
