d3.csv('coffee-house-chains.csv', d3.autoType).then(data=>{
    console.log('coffee-house-chains.csv', data)

const margin = {top:50, left:50, bottom:80, right:50};
const width = 500-margin.left- margin.right;
const height = 500-margin.top- margin.bottom;
    
const svg = d3.select('.chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr("transform", 'translate(' + margin.left + ',' + margin.top + ')');


const xScale = d3.scaleBand()
    .range([0, width])
    .domain(data.map(function(d) {
        return d.company;
      }))
    .padding(0.2);
svg.append('g')
      .attr("transform", 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");


const yScale = d3.scaleLinear()
    .domain([0, 22000])
    .range([height, 0]);
svg.append('g')
    .call(d3.axisLeft(yScale));


  svg.selectAll('chart')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', function(d) {
        return xScale(d.company);
    })
    .attr('y', function(d) {
        return yScale(d.stores);
    })
    .attr('width', xScale.bandwidth())
    .attr('height', function(d) {
        return height - yScale(d.stores);
    })
    .attr('fill', 'lightblue')



})