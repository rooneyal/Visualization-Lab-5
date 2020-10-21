let type = document.querySelector("#group-by").value
const margin = {top:50, left:100, bottom:80, right:50};
const width = 700-margin.left- margin.right;
const height = 600-margin.top- margin.bottom;

let sorter = 1

const svg = d3.select('.chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr("transform", 'translate(' + margin.left + ',' + margin.top + ')');

const xScale = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);
    
const xAxis = d3.axisBottom()
      .scale(xScale);

const yScale = d3.scaleLinear()
    .range([height, 0]);

const yAxis = d3.axisLeft()
    .scale(yScale);

svg.append('g')
    .attr('class', 'x-axis')
    .call(xAxis)
    .attr('transform', 'translate(' + 0 + ' , ' + height + ')');

svg.append('g')
    .attr('class', 'y-axis axis')
    .call(yAxis)
    .attr('transform', 'translate(' + 0 + ')');


d3.csv('coffee-house-chains.csv', d3.autoType).then(data=>{ 
    type = document.querySelector("#group-by").value
    console.log(type)
    let click = 0
    update(data)
    data.sort()
    console.log('coffee-house-chains.csv', data)
    document.querySelector('#sort')
addEventListener('click', (event) => {
if (click == false) {
                click = true;
            } else {
                click = false;
            }
            update(data, type)
        })
    document.querySelector("#group-by").addEventListener('change', (event) => {
        update(data, event.target.value)})
   
    })

svg.append('text')
    .attr('class', 'axis-text')
    .attr('x', -15)
    .attr('y', -5)
    .attr('dy', '.1em')
    .style('text-anchor', 'end')
    .text(function() {
        if (type == 'stores') {
            return "Stores"
        }
        else {
            return "Billions USD"
        }
    });

function update(data, type) {
    type = document.querySelector("#group-by").value

    if (sorter == 1 && type == "revenue") {
        data = data.sort((a,b) => b.revenue-a.revenue)
    }
    else if ( sorter == 1 && type == "stores") {
        data = data.sort((a,b) => b.stores-a.stores)
    }
    else if (sorter = 0 && type == "revenue") {
        data = data.sort((a,b) => a.revenue-b.revenue)
    }
    else {
        data = data.sort((a,b) => a.stores-b.stores)
    }

    xScale.domain(data.map(d=>d.company))

    yScale.domain([0, d3.max(data,d=>d[type])]);

    
    const rects = svg.selectAll('rect')
        .data(data, d=> {
            return d.company;
        });

    rects.enter()
        .append('rect')
        .merge(rects)
        .transition()
        .duration(1000)
        .attr('stroke', 'black')
        .attr('x', d=>xScale(d.company))
        .attr('y', d=>yScale(d[type]))
        .attr('width', xScale.bandwidth())
        .attr('height', function(d) {
            return height - yScale(d[type]);
        })
        .attr('fill', 'brown')


        rects.exit().remove();

svg.append('text')
    .attr('class', 'axis-text')
    .attr('x', -5)
    .attr('y', -15)
    .attr('dy', '.1em')
    .style('text-anchor', 'end')
    .text(function() {
        if (type == 'stores') {
            return "Stores"
        }
        else {
            return "Billions USD"
        }

    });

d3.select('.sort')
.on('clicker', function(d) {
    if (sorter == 1) {
        sorter = 0
    }
    else {
        sorter = 1
    }
    console.log(sorter)
})

svg.select('text.axis-text').remove();

    svg.select('.x-axis')
        .call(xAxis);
        
    svg.select('.y-axis')
        .call(yAxis)}

