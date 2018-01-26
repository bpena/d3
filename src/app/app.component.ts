import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SvgForcedComponent} from './graph/svg-forced/svg-forced.component';
import {GraphNodeService} from './graph/services/node/graph-node.service';
import {GraphForceService} from './graph/services/force/graph-force.service';
import {GraphService} from './graph/services/graph/graph.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('svg') private svg: SvgForcedComponent;

  constructor(
    private nodeService: GraphNodeService,
    private graphService: GraphService,
    private forceService: GraphForceService) {}

  ngOnInit() {
  }

  changeData() {
    this.nodeService.changeOption();
  }

  switchSimulation() {
    this.forceService.switchForce();
  }

  toggleShowImage() {
    this.graphService.toggleShowImage();
  }

  toggleShowText() {
    this.graphService.toggleShowText();
  }
}
