d3.select("#scatter")

var width = parseInt(d3.select("#scatter").style("width"));
var height = width - width / 3.9;
var margin = 20
var svg = d3.select("#scatter").append("svg")
    .attr("width", width)
    .attr("height", height);

var xText = svg
    .append('g')
    .attr('transform', `translate(${width / 2},${.98 * height})`);

xText
    .append('text')
    .text('Household Income (Median)')
    .attr('class', 'aText inactive x')
    .attr('data-value', 'income');

xText
    .append('text')
    .attr('y', -20)
    .text('Age (Median)')
    .attr('class', 'aText inactive x')
    .attr('data-value', 'age');

xText
    .append('text')
    .attr('y', -40)
    .text('In Poverty (%)')
    .attr('class', 'aText active x')
    .attr('data-value', 'poverty');

var yText = svg
    .append('g')
    .attr('transform', `translate(${0.02 * width},${height / 2})rotate(-90)`)

yText
    .append('text')
    .text('Obese (%)')
    .attr('class', 'aText inactive y')
    .attr('data-value', 'obesity');

yText
    .append('text')
    .attr('y', 20)
    .text('Smokers (%)')
    .attr('class', 'aText inactive y')
    .attr('data-value', 'smokes');

yText
    .append('text')
    .attr('y', 40)
    .text('Lacks Healthcare (%)')
    .attr('class', 'aText active y')
    .attr('data-value', 'healthcare');

var scaleLoc = svg.append('g').attr('transform',`translate(${0.1*width}, ${.85*height})`);
var xScaleLoc = scaleLoc.append('g').transition().duration(200);
var yScaleLoc = scaleLoc.append('g').transition().duration(200);

renderData();

d3.selectAll('.aText').on('click', function () {
    if (d3.select(this).classed('x')) {
        d3.selectAll('.x').classed('active', false)
        d3.selectAll('.x').classed('inactive', true)
    } else {
        d3.selectAll('.y').classed('active', false)
        d3.selectAll('.y').classed('inactive', true)
    };
    d3.select(this).classed('inactive', false);
    d3.select(this).classed('active', true);

    renderData();
});

function renderData() {
    let xVal = d3.selectAll('.x').filter('.active').attr('data-value');
    let yVal = d3.selectAll('.y').filter('.active').attr('data-value');
    let toolTip = d3.tip().attr('class','d3-tip')

    d3.csv('assets/data/data.csv').then(data => {
        let xData = data.map(data=> +data[xVal]);
        let yData = data.map(data=> +data[yVal]);
            toolTip.html(d=>`<div>${d.state}</div><div>${xVal}: ${d[xVal]}</div><div>${yVal}: ${d[yVal]}</div>`)

        var xScale = d3.scaleLinear().domain([d3.min(xData) * 0.9,d3.max(xData) * 1.1]).range([0, .8*width]);
        var yScale = d3.scaleLinear().domain([d3.min(yData) - 2, d3.max(yData) + 2]).range([-.8*height, 0]);

        xScaleLoc.call(d3.axisBottom(xScale))
        yScaleLoc.call(d3.axisLeft(yScale))

        // var circles = scaleLoc.selectAll('g').data(data).enter().append('g');
        var circles = scaleLoc.selectAll('g').data(data).enter().append('g')
            .on('mouseover', function (d) {
                toolTip.show(d, this);
                d3.select(this).style('stroke','#e3e3e3');
                })
            .on('mouseout', function (d) {
                toolTip.hide(d, this);
                
            })
            circles.append('circle').attr('r', .02*width).attr('class','stateCircle');
            circles.append('text').attr('class','stateText');    

        d3.selectAll('.stateCircle').transition().duration(1000).attr('cx',d=>xScale(d[xVal])).attr('cy',d=>yScale(d[yVal]));
        d3.selectAll('.stateText').transition().duration(1000).attr('dx',d=>xScale(d[xVal])).attr('dy',d=>yScale(d[yVal])+5).text(d=>d.abbr);

        circles.call(toolTip);
    })
};
