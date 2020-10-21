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
    .attr('class', 'y-axis')
    .call(yAxis)
    .attr('transform', 'translate(' + 0 + ')');


d3.csv('coffee-house-chains.csv', d3.autoType).then(data=>{ 
    type = document.querySelector("#group-by").value
    let click = 0
    update(data, type)
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


function update(data, type) {
    type = document.querySelector("#group-by").value

    xScale.domain(data.map(d=>d.company))

    yScale.domain([0, d3.max(data,d=>d[type])]);

    const rects = svg.selectAll('rect')
        .data(data, d=> {
            return d.company;
        });

    rects.enter()
        .append('rect')
        .merge(rects)
        .attr('x', d=>xScale(d.company))
        .attr('y', d=>yScale(d[type]))
        .attr('width', xScale.bandwidth())
        .attr('height', function(d) {
            return height - yScale(d[type]);
        })
        .attr('fill', 'brown')

        rects.exit().remove();

    svg.exit()
        .remove();
    }

    svg.select('.x-axis')
        .call(xAxis);
        
    svg.select('.y-axis')
        .call(yAxis);