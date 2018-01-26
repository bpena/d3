import {AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {GraphNodeService} from '../services/node/graph-node.service';
import {GraphForceService} from '../services/force/graph-force.service';
import {isNullOrUndefined} from 'util';
import {GraphService} from '../services/graph/graph.service';

@Component({
  selector: 'app-svg-forced',
  templateUrl: './svg-forced.component.html',
  styleUrls: ['./svg-forced.component.scss']
})
export class SvgForcedComponent implements OnInit, AfterViewChecked, OnChanges {
  @ViewChild('forcedDirectedSvgContainer') private svgContainer: ElementRef;
  @Input() nodes: Array<any>;
  @Input() links: Array<any>;
  @Input() class: string;
  @Input() showImage = false;
  @Input() showText = false;
  @Output() expandNode: EventEmitter<number> = new EventEmitter();
  @Output() collapseNode: EventEmitter<number> = new EventEmitter();
  @Output() clicked: EventEmitter<number> = new EventEmitter();

  hostElement: any;
  svg: any;
  simulation: any;

  linkForce: any;
  collideForce: any;
  chargeForce: any;
  centerFoce: any;
  xForce: any;
  yForce: any;

  linkGroup: any;
  linkElements: any;
  nodeGroup: any;
  nodeElements: any;
  imageGroup: any;
  imageElements: any;
  textGroup: any;
  textElements: any;

  margin: any;
  hostElementHeight: number;
  height: number;
  width: number;

  initialized = false;

  constructor(private forceService: GraphForceService,
              private graphService: GraphService,
              private nodeService: GraphNodeService) { }

  ngOnInit() {
    this.hostElement = this.svgContainer.nativeElement; // elemento contenedor del svg

    // obtiene cambios en la lista de nodos y enlaces
    this.nodeService.getData().subscribe(data => {
      this.nodes = data.nodes;
      this.links = data.links;
      if (this.nodes.length > 0 && this.svg) {
        this.runSimulation();
      }
    });

    // observa los cambios en el valor del status de la simulación
    this.forceService.statusForce().subscribe(value => this.toggleForces(value));

    // permite realizar cambios entre imagen y circulo
    this.graphService.getShowImage().subscribe(value => {
      if (value !== this.showImage) {
        this.showImage = value;
        if (this.showImage) {
          this.nodeGroup.remove();
          this.svg.append(() => this.imageGroup.node());
        } else {
          this.imageGroup.remove();
          this.svg.append(() => this.nodeGroup.node());
        }

      }
    });

    // observa cambios en el estatus del valor de visualización de la capa de texto
    this.graphService.getShowText().subscribe(value => {
      if (value !== this.showText) {
        this.showText = value;
        if (this.showText) {
          this.svg.append(() => this.textGroup.node());
        } else {
          this.textGroup.remove();
        }
      }
    });
  }

  ngAfterViewChecked() {
    // inicia todo, cuando ya se tenga el elemento disponible y no se esté inicializado aún
    if (this.hostElement && this.hostElement.offsetHeight !== 0 && this.hostElement.offsetHeight !== this.hostElementHeight) {
      this.hostElementHeight = this.hostElement.offsetHeight;
      this.createChart();
      this.configureForces();
      // si se tiene nodos y el componente svg se ha creado, corremos la simulación
      if (this.nodes.length > 0 && this.svg) {
        this.runSimulation();
      }
      this.initialized = true;
    }
  }

  ngOnChanges() {
  }

  createChart() {
    // definie el evento para zoom y drag and drop del componente svg
    const zoom = d3.zoom()
      .scaleExtent([-2, 10])
      .on('zoom', this.zoomed);

    this.margin = { top: 0, right: 0, bottom: 0, left: 0};
    this.width = this.hostElement.offsetWidth - this.margin.left - this.margin.right;
    this.height = this.hostElement.offsetHeight - this.margin.top - this.margin.bottom;

    // crea un nuevo componente svg y lo agrega al host element.
    this.svg = d3.select(this.hostElement)
      .append('svg')
      .attr('width', this.hostElement.offsetWidth)
      .attr('height', this.hostElement.offsetHeight)
      .call(zoom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    // crea las capas que se utilizaran durante toda la simulación
    this.linkGroup = this.svg.append('g').attr('class', 'links');
    this.nodeGroup = this.svg.append('g').classed('nodes', true);
    if (this.showImage) { this.nodeGroup.remove(); }
    this.imageGroup = this.svg.append('g').classed('images', true);
    if (!this.showImage) { this.imageGroup.remove(); }
    this.textGroup = this.svg.append('g').classed('text', true);
    this.textGroup.remove();
  }

  runSimulation() {
    // crea el componente simulación
    this.simulation = d3.forceSimulation();
    // inicia las fuerzas de la simulación
    this.toggleForces(true);
    // renderiza los nodos
    this.render();
  }

  render = () => {
    // define los eventos para el drag and drop sobre los nodos
    const drag = d3.drag()
      .on('start', this.dragstarted)
      .on('drag', this.dragged)
      .on('end', this.dragended);

    // crea las capas de enlaces
    this.linkElements = this.linkGroup.selectAll('line')
      .data(this.links, link => link.target.id + link.source.id);
    // remueve todos los enlaces, en caso de que existan
    this.linkElements.exit().remove();
    // agrega las capas de enlaces
    const linkEnter = this.linkElements
      .enter().append('line')
      .attr('stroke-width', 2)
      .attr('stroke', '#d2d7d3');

    this.linkElements = linkEnter.merge(this.linkElements);

    // crea la capa de nodos (circulos)
    this.nodeElements = this.nodeGroup.selectAll('circle')
      .data(this.nodes, node => node.id);
    // remueve todos los nodos, en caso que existan
    this.nodeElements.exit().remove();
    // agrega las capas de nodos
    const nodeEnter = this.nodeElements
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('fill', '#333')
      .on('dblclick', this.dblclicked)
      .call(drag);
    this.nodeElements = nodeEnter.merge(this.nodeElements);

    // crea la capa de imagenes (metáforas)
    this.imageElements = this.imageGroup.selectAll('image')
      .data(this.nodes, node => node.id);
    // remueve todas las metaforas, en caso que existan
    this.imageElements.exit().remove();
    // agrega las capas de imágenes
    const imageEnter = this.imageElements
      .enter()
      .append('image')
      .attr('xlink:href', 'assets/images/access.svg')
      .attr('x', -12)
      .attr('y', -12)
      .attr('width', 24)
      .attr('height', 24)
      .on('dblclick', this.dblclicked)
      .call(drag);
    this.imageElements = imageEnter.merge(this.imageElements);

    // Crea la capa de grupo de texto (label)
    this.textElements = this.textGroup.selectAll('text')
      .data(this.nodes, node => node.id);
    // elimina cualquier texto existente.
    this.textElements.exit().remove();
    // agrega las capas de texto
    const textEnter = this.textElements
      .enter()
      .append('text')
      .attr('dx', 12)
      .attr('dy', 6)
      .text(function (d) { return d.x + ' , ' + d.y; })
      .call(drag);
    this.textElements = textEnter.merge(this.textElements);

    this.simulation.nodes(this.nodes).on('tick', this.ticked);

    this.simulation.force('link').links(this.links);
  }

  ticked = () => {
    // ubicación de los nodos
    this.nodeElements
      .attr('transform', (node: any)  => 'translate(' + node.x + ',' + node.y + ')');

    // ubicación de las metáforas
    this.imageElements
      .attr('transform', (node: any)  => 'translate(' + node.x + ',' + node.y + ')');

    // ubicación del texto
    this.textElements
      .attr('transform', (node: any)  => 'translate(' + node.x + ',' + node.y + ')')
      .text((node: any) => node.x + ' , ' + node.y);

    // ubicación de los enlaces
    this.linkElements
      .attr('x1', link => link.source.x)
      .attr('y1', link => link.source.y)
      .attr('x2', link => link.target.x)
      .attr('y2', link => link.target.y);
  }

  dragstarted = (d) => {
    if (!d3.event.active) { this.simulation.alphaTarget(0.3).restart(); }
    d.fx = d.x;
    d.fy = d.y;
  }

  dragged = (d) => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragended = (d) => {
    if (!d3.event.active) { this.simulation.alphaTarget(0); }
    d.fx = null;
    d.fy = null;
  }

  zoomed = () => {
    this.svg.attr('transform', d3.event.transform); // updated for d3 v4
  }

  dblclicked = (d) => {
    d3.event.stopPropagation();
    d.expanded = d.expanded ? !d.expanded : true;
    if (d.expanded) {
      this.expandNode.emit(d.id);
    } else {
      this.collapseNode.emit(d.id);
    }
  }

  // activa / desactiva la simulación
  private toggleForces(value: boolean) {
    if (isNullOrUndefined(this.simulation)) { return; }
    if (!value) {
      this.stopForces();
    } else {
      this.startForces();
    }
  }

  // detiene la simulación
  private stopForces() {
    this.simulation
      .force('link', null)
      .force('collide', null)
      .force('charge', null)
      .force('center', null)
      .force('forceX', null)
      .force('forceY', null);
  }

  // inicia la simulación
  private startForces() {
    this.simulation
      .force('link', this.linkForce)
      .force('collide', this.collideForce)
      .force('charge', this.chargeForce)
      .force('center', this.centerFoce)
      .force('forceX', this.xForce)
      .force('forceY', this.yForce);
  }

  // configura los valores de las fuerzas utilizadas en la simulación
  private configureForces() {
    this.linkForce = d3.forceLink().id((node: any) => node.id);
    this.collideForce = d3.forceCollide().radius(4);
    this.chargeForce = d3.forceManyBody().strength(-100);
    this.centerFoce = d3.forceCenter().x(this.width / 2).y(this.height / 2);
    this.xForce = d3.forceX().strength(0.3).x(this.width / 2);
    this.yForce = d3.forceY().strength(0.3).y(this.height / 2);
  }
}
