import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {SvgForcedComponent} from './graph/svg-forced/svg-forced.component';


const ROUTES: Routes = [
  // { path: '', component: BothComponent },
  { path: '', component: SvgForcedComponent},
  { path: 'only-svg', component: SvgForcedComponent }
];

export const appRouter: ModuleWithProviders = RouterModule.forRoot(ROUTES);
