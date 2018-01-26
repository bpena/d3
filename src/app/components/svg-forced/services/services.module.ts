import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GraphNodeService} from './node/graph-node.service';
import {GraphForceService} from './force/graph-force.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    GraphForceService,
    GraphNodeService
  ]
})
export class ServicesModule { }
