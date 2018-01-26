import { Component, OnInit } from '@angular/core';
import {GraphNodeService} from '../svg-forced/services/node/graph-node.service';

@Component({
  selector: 'app-both',
  templateUrl: './both.component.html',
  styleUrls: ['./both.component.scss']
})
export class BothComponent implements OnInit {
  nodes: Array<any>;
  links: Array<any>;

  constructor(private nodeService: GraphNodeService) { }

  ngOnInit() {
    this.nodeService.getData().subscribe(data => {
      this.nodes = data.nodes;
      this.links = data.links;
    });
  }

}
