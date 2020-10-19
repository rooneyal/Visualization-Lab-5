d3.csv('coffee-house-chains.csv', d3.autoType).then(data=>{
    console.log('coffee-house-chains.csv', data)

    data = data.sort((a,b)=>b.revenue-a.revenue);

const margin = {top:50, left:50, bottom:50, right:50};
const width = 700-margin.left- margin.right;
const height = 500-margin.top- margin.bottom;
    
const svg = d3.select('.BarChart').append('svg')
    .attr('width', width +margin.left +margin.right)
    .attr('height', height +margin.top +margin.bottom)
    .append('g')
    .attr('transform', 'translate('+margin.left+','+margin.top+')')
  
const xScale = d3.scalePoint()
    .domain(data)
    .range([0, width]);

const sizeScale = d3.scaleLinear()
    .domain(d3.extent(data))
    .range([5, 15]);

svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('length', d=>xScale)
    .attr('height', height/2)
    .attr('fill', 'lightblue')
})