d3.select("#scatter").style("border", '2px solid black')

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
    var xVal = d3.selectAll('.x').filter('.active').attr('data-value');
    var yVal = d3.selectAll('.y').filter('.active').attr('data-value');

    d3.csv('assets/data/data.csv').then(data => {
        var toolTip = d3.tip().attr('class','d3-tip')
            .html(d=>`<div>${d.state}</div><div>${xVal}: ${d[xVal]}</div>`)
        var xData = data.map(data=> +data[xVal]);
        var yData = data.map(data=> +data[yVal]);

        console.log(xData);
   
        var xScale = d3.scaleLinear().domain([d3.min(xData) * 0.9,d3.max(xData) * 1.1]).range([0, .8*width]);
        var yScale = d3.scaleLinear().domain([d3.min(yData) - 2, d3.max(yData) + 2]).range([-.8*height, 0]);

        xScaleLoc.call(d3.axisBottom(xScale))
        yScaleLoc.call(d3.axisLeft(yScale))

        var circles = scaleLoc.selectAll('g').data(data).enter().append('g').on('mouseover', function (d) {
            toolTip.show(d, this);
            d3.select(this).style('stroke','#e3e3e3');
        });

        circles.append('circle').attr('r', .02*width).attr('class','stateCircle');
        circles.append('text').attr('class','stateText');    
    });
};
        
//     var circlesGroup = d3.selectAll("circle")
//         .data(xVal)
//         .enter()
//         .append("g");

//     var circles = circlesGroup.append("circle")
//         .attr("d", d => xScale(xVal))
//         .attr(yVal)
//         .attr("r", 10)
//         .classed("stateCircle", true);

//     var circlesText = circlesGroup.append("text")
//         .text(d => d.abbr)
//         .attr(d => xLinearScale(xData))
//         .attr(d => yLinearScale(yData) + 5)
//         .classed("stateText", true);

 
// function renderXCircles(circles, xScale, xText) {

//     circles.transition()
//         .duration(500)
//         .attr("d", d => xScale(d[xText]))
//         .attr("d", d => xScale(d[xText]));

//     return circles;

// };

// function renderYCircles(circles, yScale, yText) {

//     circles.transition()
//         .duration(500)
//         .attr("d", d => yScale(d[yText]))
//         .attr("d", d => yScale(d[yText]));

//     return circles;

// };

// function renderXText(circles, xScale, xText) {

//     circles.transition()
//         .duration(500)
//         .attr("d", d => xScale(d[xText]));

//     return circles;

// };

// function renderYText(circles, yScale, yText) {

//     circles.transition()
//         .duration(500)
//         .attr("d", d => yScale(d[yText]));

//     return circles;

// };

// function updateToolTip(xText, yText, circles) {

//     var xlabel;
//     var ylabel;

//     if (xText === "income") {
//         xlabel = "Household Income (Median):", d.income;
//     }
//     else if (xText === "age") {
//         xlabel = "Age (Median):", d.age;
//     }
//     else if (xText === "poverty") {
//         xlabel = "In Poverty (%):", d.poverty;
//     }

//     if (yText === "obesity") {
//         ylabel = "Obese (%):", d.obesity;
//     }
//     else if (yText === "smokes") {
//         ylabel = "Smoker (%):", d.smokes;
//     }
//     else if (yText === "healthcare") {
//         ylabel = "Lacks Healthcare (%):", d.healthcare;
//     }


//     var toolTip = d3.tip()
//         .attr("class", "tooltip")
//         .offset([80, -60])
//         .style("color", "blue")
//         .style("background", "white")
//         .style("border", "black")
//         .style("border-width", width)
//         .style("border-radius", 10)
//         .style("padding", 0.05)
//         .html(function (d) {
//             return (`${d.state}<br>${xlabel} ${d[xText]}%<br>${ylabel} ${d[yText]}%`);
//         });

//     circles.call(toolTip);

//     circles.on("mouseover", function (data) {
//         toolTip.show(data);
//     });
//     circles.on("mouseout", function (data, index) {
//         toolTip.hide(data);
//     });

//     return circles;
// };


// d3.csv('assets/data/data.csv').then(data => {
//     console.log(data[10]);
// });