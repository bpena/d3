import {AfterViewChecked, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {isNullOrUndefined} from 'util';
import {GraphNodeService} from '../svg-forced/services/node/graph-node.service';

@Component({
  selector: 'app-canvas-forced',
  templateUrl: './canvas-forced.component.html',
  styleUrls: ['./canvas-forced.component.scss']
})
export class CanvasForcedComponent implements OnInit, AfterViewChecked, OnChanges {
  @ViewChild('forcedDirectedCanvas') private chartContainer: ElementRef;
  @Input() nodes: Array<any>;
  @Input() links: Array<any>;
  @Input() nodeRadius = 24;

  canvas: any;
  context: any;
  simulation: any;

  width: number;
  height: number;
  hostElementHeight: number;
  margin: any;

  initialized: boolean;
  deltaX: number; // transform x
  deltaY: number; // transform y
  deltaK: number; // transform zoom

  constructor(private nodeService: GraphNodeService) {
    this.initialized = false;
  }

  ngOnInit() {
    this.deltaX = 0;
    this.deltaY = 0;
    this.canvas = this.chartContainer.nativeElement;
    this.nodeService.getData().subscribe(data => {
      this.nodes = data.nodes;
      this.links = data.links;
      if (this.initialized) {
        this.startSimulation();
      }
    });
  }

  ngAfterViewChecked() {
    if (this.canvas && this.canvas.offsetHeight !== 0 && this.canvas.offsetHeight !== this.hostElementHeight) {
      this.hostElementHeight = this.canvas.offsetHeight;
      this.createChart();
      this.initialized = true;
    }
  }

  ngOnChanges() {}

  createChart() {
    const zoom = d3.zoom()
      .scaleExtent([-2, 10])
      .on('zoom', this.zoomed);

    this.context = this.canvas.getContext('2d');
    this.updateSize();

    this.simulation = d3.forceSimulation();
    this.startSimulation();

    this.simulation
      .nodes(this.nodes)
      .on('tick', (node: any) => this.ticked());

    this.simulation.force('link')
      .links(this.links);

    d3.select(this.canvas)
      .call(d3.drag()
        .container(this.canvas)
        .subject(() => {
          const posX = d3.event.x - this.deltaX;
          const posY = d3.event.y - this.deltaY;
          console.log(posX);
          console.log(posY);
          return this.simulation.find(posX, posY, this.nodeRadius);
        })
        .on('start', () => {
          if (!d3.event.active) { this.simulation.alphaTarget(0.3).restart(); }
          d3.event.subject.fx = d3.event.subject.x;
          d3.event.subject.fy = d3.event.subject.y;
        })
        .on('drag', () => {
          d3.event.subject.fx = d3.event.x;
          d3.event.subject.fy = d3.event.y;
        })
        .on('end', () => {
          if (!d3.event.active) { this.simulation.alphaTarget(0); }
          d3.event.subject.fx = null;
          d3.event.subject.fy = null;
        }));

    d3.select(this.canvas)
      .call(zoom);
  }

  updateSize() {
    this.margin = { top: 5, right: 5, bottom: 5, left: 5};
    this.width = this.canvas.offsetWidth - this.margin.left - this.margin.right;
    this.height = this.canvas.offsetHeight - this.margin.top - this.margin.bottom;
    this.canvas.height = this.height;
    this.canvas.width = this.width;
  }

  startSimulation() {
    if (!isNullOrUndefined(this.nodes) && !isNullOrUndefined(this.links)) {
    //  this.simulation.force('link', d3.forceLink().distance(15));
    //  this.simulation.force('charge', d3.forceManyBody());
    //  this.simulation.force('center', d3.forceCenter(this.canvas.width / 2, this.canvas.height / 2));
      // this.simulation.on('tick', () => this.ticked());
      this.simulation
        .force('link', d3.forceLink().id((node: any) => node.id).strength(0.9))
        .force('collide', d3.forceCollide().radius(50 ).strength(1).iterations(1))
        .force('charge', d3.forceManyBody().strength(.001).distanceMax(100).distanceMin(90))
        .force('center', d3.forceCenter().x(this.width / 2).y(this.height / 2))
        .force('forceX', d3.forceX(0).strength(0.01))
        .force('forceY', d3.forceY(0).strength(0.01))
      ;
    }
  }

  stopSimulation() {
    this.simulation.force('link', null);
    this.simulation.force('charge', null);
    this.simulation.force('center', null);
  }

  ticked() {
//    this.clear();
//    this.links.forEach(link => this.drawLink(link));
//    this.nodes.forEach(node => this.drawNode(node));
//    this.context.restore();

    this.context.clearRect(0, 0, this.width, this.height);
    this.context.beginPath();
    this.links.forEach(_node => this.drawLink(_node));
    this.context.strokeStyle = '#fff';
    this.context.stroke();
    this.context.beginPath();
    this.nodes.forEach(_node => this.drawNode(_node));
    this.context.fill();
    this.context.strokeStyle = '#fff';
    this.context.stroke();
  }

  draw() {
    this.context.beginPath();
    this.links.forEach(link => this.drawLink(link));
    this.context.strokeStyle = '#aaa';
    this.context.stroke();

    this.context.beginPath();
    this.nodes.forEach(node => this.drawNode(node));
    this.context.fill();
    this.context.strokeStyle = '#fff';
    this.context.stroke();
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.save();
  }

  drawLink(d: any) {
//    this.links.forEach((d: any) => {
      this.context.strokeStyle = '#ffffff';
      this.context.lineWidth = 3;
      this.context.beginPath();
      this.context.moveTo(d.source.x, d.source.y);
      this.context.lineTo(d.target.x, d.target.y);
      this.context.stroke();
//    });
  }

  drawNode(d: any) {
//    this.nodes.forEach((d: any) => {
      // circle
      this.context.fillStyle = '#ffffff';
      this.context.strokeStyle = '#000000';
      this.context.lineWidth = 3;
      this.context.beginPath();
      this.context.moveTo(d.x + this.nodeRadius, d.y);
      this.context.arc(d.x, d.y, this.nodeRadius, 0, 2 * Math.PI);
      this.context.fill();
      this.context.stroke();
      // text
      this.context.fillStyle = '#000';
      this.context.font = '12px sans-serif';
      this.context.fillText(d.x + ' ' + d.y, d.x - this.nodeRadius / 2, d.y + this.nodeRadius / 2);
//    });
  }

  zoomed = () => {
    this.deltaX = d3.event.transform.x;
    this.deltaY = d3.event.transform.y;
    this.deltaK = d3.event.transform.k;
    this.context.save();
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.translate(d3.event.transform.x, d3.event.transform.y);
    this.context.scale(d3.event.transform.k, d3.event.transform.k);

    this.draw();
    this.context.restore();
  }
}
