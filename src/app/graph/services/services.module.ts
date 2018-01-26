import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GraphNodeService} from './node/graph-node.service';
import {GraphForceService} from './force/graph-force.service';
import {GraphService} from './graph/graph.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    GraphForceService,
    GraphNodeService,
    GraphService
  ]
})
export class ServicesModule { }
