import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CanvasForcedComponent} from './components/canvas-forced/canvas-forced.component';
import {GraphNodeService} from './components/svg-forced/services/node/graph-node.service';
import {SvgForcedComponent} from './components/svg-forced/svg-forced.component';
import {GraphForceService} from './components/svg-forced/services/force/graph-force.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('canvas') private canvas: CanvasForcedComponent;
  @ViewChild('svg') private svg: SvgForcedComponent;

  constructor(
    private nodeService: GraphNodeService,
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
    this.nodeService.toggleShowImage();
  }

  toggleShowText() {
    this.nodeService.toggleShowText();
  }
}
