import { useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import { BJJConcept, LabelItem, Category } from '../types/concepts';

interface UseD3ScatterPlotProps {
  svgRef: React.RefObject<SVGSVGElement | null>;
  concepts: BJJConcept[];
  categories: Category[];
  size: { width: number; height: number };
  margin: number;
  hovered: string | null;
  selected: BJJConcept | null;
  pingedNodeId: string | null;
  pingStep: number;
  labelItems: LabelItem[];
  setHovered: (id: string | null) => void;
  setSelected: (concept: BJJConcept) => void;
}

export const useD3ScatterPlot = ({
  svgRef,
  concepts,
  categories,
  size,
  margin,
  hovered,
  selected,
  pingedNodeId,
  pingStep,
  labelItems,
  setHovered,
  setSelected,
}: UseD3ScatterPlotProps) => {
  // Memoize grid data to prevent unnecessary recalculations
  const gridData = useMemo(() => {
    const { width, height } = size;
    const verticalLines = Array.from({ length: 11 }, (_, i) => ({
      x1: margin + (i / 10) * (width - 2 * margin),
      y1: margin,
      x2: margin + (i / 10) * (width - 2 * margin),
      y2: height - margin,
      strokeWidth: i % 5 === 0 ? 1 : 0.5,
    }));
    
    const horizontalLines = Array.from({ length: 11 }, (_, i) => ({
      x1: margin,
      y1: margin + (i / 10) * (height - 2 * margin),
      x2: width - margin,
      y2: margin + (i / 10) * (height - 2 * margin),
      strokeWidth: i % 5 === 0 ? 1 : 0.5,
    }));
    
    return { verticalLines, horizontalLines };
  }, [size, margin]);

  // Memoize axis labels based on categories
  const axisLabels = useMemo(() => {
    const { width, height } = size;
    
    // Get the first category's axis labels as default
    const defaultCategory = categories[0];
    const xAxisLeft = defaultCategory?.xAxis?.left || 'Mental';
    const xAxisRight = defaultCategory?.xAxis?.right || 'Physical';
    const yAxisBottom = defaultCategory?.yAxis?.bottom || 'Self';
    const yAxisTop = defaultCategory?.yAxis?.top || 'Opponent';
    
    return {
      xAxis: [
        { x: margin, y: height - 10, text: xAxisLeft, anchor: 'start' },
        { x: width - margin, y: height - 10, text: xAxisRight, anchor: 'end' }
      ],
      yAxis: [
        { x: 10, y: height - margin, text: yAxisBottom, anchor: 'start' },
        { x: 10, y: margin, text: yAxisTop, anchor: 'start' }
      ]
    };
  }, [size, margin, categories]);

  // Memoize node data with computed properties
  const nodeData = useMemo(() => {
    const { width, height } = size;
    return concepts.map(concept => ({
      ...concept,
      cx: margin + concept.axis_mental_physical * (width - 2 * margin),
      cy: height - margin - concept.axis_self_opponent * (height - 2 * margin),
      r: 4 + concept.size * 2,
      opacity: pingedNodeId === concept.id 
        ? 0.5 + 0.5 * Math.abs(Math.sin(pingStep))
        : 0.4 + concept.brightness * 0.06,
      stroke: hovered === concept.id || (selected && selected.id === concept.id) ? '#fff' : 'none',
      strokeWidth: pingedNodeId === concept.id ? 5 : hovered === concept.id ? 3 : 0,
    }));
  }, [concepts, size, margin, hovered, selected, pingedNodeId, pingStep]);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const { width, height } = size;

    // Clear previous content
    svg.selectAll('*').remove();

    // Draw grid lines
    const gridGroup = svg.append('g').attr('class', 'grid');
    
    // Vertical grid lines
    gridGroup.selectAll('line.vertical')
      .data(gridData.verticalLines)
      .enter()
      .append('line')
      .attr('class', 'vertical')
      .attr('x1', d => d.x1)
      .attr('y1', d => d.y1)
      .attr('x2', d => d.x2)
      .attr('y2', d => d.y2)
      .attr('stroke', '#333')
      .attr('stroke-width', d => d.strokeWidth)
      .attr('opacity', 0.3);

    // Horizontal grid lines
    gridGroup.selectAll('line.horizontal')
      .data(gridData.horizontalLines)
      .enter()
      .append('line')
      .attr('class', 'horizontal')
      .attr('x1', d => d.x1)
      .attr('y1', d => d.y1)
      .attr('x2', d => d.x2)
      .attr('y2', d => d.y2)
      .attr('stroke', '#333')
      .attr('stroke-width', d => d.strokeWidth)
      .attr('opacity', 0.3);

    // Draw axis labels
    const labelGroup = svg.append('g').attr('class', 'labels');
    
    // X-axis labels
    labelGroup.selectAll('text.x-axis')
      .data(axisLabels.xAxis)
      .enter()
      .append('text')
      .attr('class', 'x-axis')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('text-anchor', d => d.anchor)
      .attr('fill', '#666')
      .attr('font-size', '12px')
      .text(d => d.text);

    // Y-axis labels
    labelGroup.selectAll('text.y-axis')
      .data(axisLabels.yAxis)
      .enter()
      .append('text')
      .attr('class', 'y-axis')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('text-anchor', d => d.anchor)
      .attr('fill', '#666')
      .attr('font-size', '12px')
      .text(d => d.text);

    // Draw nodes with optimized data binding
    const nodeGroup = svg.append('g').attr('class', 'nodes');
    
    nodeGroup.selectAll('circle')
      .data(nodeData, (d: any) => d.id)
      .join(
        enter => enter.append('circle')
          .attr('fill', d => d.color)
          .style('cursor', 'pointer'),
        update => update,
        exit => exit.remove()
      )
      .attr('cx', d => d.cx)
      .attr('cy', d => d.cy)
      .attr('r', d => d.r)
      .attr('opacity', d => d.opacity)
      .attr('stroke', d => d.stroke)
      .attr('stroke-width', d => d.strokeWidth)
      .on('mouseover', (event, d) => setHovered(d.id))
      .on('mouseout', () => setHovered(null))
      .on('click', (event, d) => setSelected(d))
      .on('touchstart', (event, d) => {
        event.preventDefault();
        setSelected(d);
      });

    // Draw labels with optimized data binding
    const labelItemsGroup = svg.append('g').attr('class', 'concept-labels');
    
    labelItemsGroup.selectAll('text.concept-label')
      .data(labelItems, (item: any) => item.d.id)
      .join(
        enter => enter.append('text')
          .attr('class', 'concept-label')
          .attr('text-anchor', 'middle')
          .attr('fill', '#fff')
          .attr('font-weight', 100)
          .style('pointer-events', 'none')
          .style('font-family', 'Inter, Roboto, Arial, sans-serif'),
        update => update,
        exit => exit.remove()
      )
      .attr('x', item => item.x)
      .attr('y', item => item.y)
      .attr('font-size', item => item.fontSize)
      .text(item => item.d.concept);

  }, [svgRef, gridData, axisLabels, nodeData, labelItems, setHovered, setSelected]);
}; 