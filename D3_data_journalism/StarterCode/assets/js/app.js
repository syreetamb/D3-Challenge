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
var xScaleLoc = scaleLoc.append('g');
var yScaleLoc = scaleLoc.append('g');

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
});

function renderData() {
    var xVal = d3.selectAll('.x').filter('.active').attr('data-value');
    var yVal = d3.selectAll('.y').filter('.active').attr('data-value');

    d3.csv('assets/data/data.csv').then(data => {

        var xData = data.map(data=> +data[xVal]);
        var yData = data.map(data=> +data[yVal]);


    })

    function xScale() {
        var xLinearScale = d3.scaleLinear()
            .domain([d3.min(xData) * 0.9,
            d3.max(xData) * 1.1])
            .range([0, width]);
    
        return xLinearScale;    
    };
        
    function yScale() {
    
        var yLinearScale = d3.scaleLinear()
            .domain([d3.min(yData) - 2, d3.max(yData) + 2])
            .range([height, 0]);
    
        return yLinearScale;
    };

    var xAxis = d3.axisBottom(xScale);

    var yAxis = d3.axisLeft(yScale);

    // var xAxis = svg.append('g')
    //    .call(bottomAxis)  
    //    .attr("tranform", `translate(0, ${height})`);

    // var yAxis = svg.append('g')
    //     .call(leftAxis);

    var circlesGroup = d3.selectAll("circle")
        .data(xVal)
        .enter()
        .append("g");

    var circles = circlesGroup.append("circle")
        .attr("d", d => xScale(xVal))
        .attr(yVal)
        .attr("r", 10)
        .classed("stateCircle", true);

    var circlesText = circlesGroup.append("text")
        .text(d => d.abbr)
        .attr(d => xLinearScale(xData))
        .attr(d => yLinearScale(yData) + 5)
        .classed("stateText", true);

    
}

     
    






// });


// function renderXCircles(circlesGroup, newXScale, chosenXAxis) {

//     circlesGroup.transition()
//         .duration(500)
//         .attr("d", d => newXScale(d[chosenXAxis]))
//         .attr("d", d => newXScale(d[chosenXAxis]));

//     return circlesGroup;

// };

// function renderYCircles(circlesGroup, newYScale, chosenYAxis) {

//     circlesGroup.transition()
//         .duration(500)
//         .attr("d", d => newYScale(d[chosenYAxis]))
//         .attr("d", d => newYScale(d[chosenYAxis]));

//     return circlesGroup;

// };

// function renderXText(circlesGroup, newXScale, chosenXAxis) {

//     circlesGroup.transition()
//         .duration(500)
//         .attr("d", d => newXScale(d[chosenXAxis]));

//     return circlesGroup;

// };

// function renderYText(circlesGroup, newYScale, chosenYAxis) {

//     circlesGroup.transition()
//         .duration(500)
//         .attr("d", d => newYScale(d[chosenYAxis]));

//     return circlesGroup;

// };

// function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

//     var xlabel;
//     var ylabel;

//     if (chosenXAxis === "income") {
//         xlabel = "Household Income (Median):", d.income;
//     }
//     else if (chosenXAxis === "age") {
//         xlabel = "Age (Median):", d.age;
//     }
//     else if (chosenXAxis === "poverty") {
//         xlabel = "In Poverty (%):", d.poverty;
//     }

//     if (chosenYAxis === "obesity") {
//         ylabel = "Obese (%):", d.obesity;
//     }
//     else if (chosenYAxis === "smokes") {
//         ylabel = "Smoker (%):", d.smokes;
//     }
//     else if (chosenYAxis === "healthcare") {
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
//             return (`${d.state}<br>${xlabel} ${d[chosenXAxis]}%<br>${ylabel} ${d[chosenYAxis]}%`);
//         });

//     circlesGroup.call(toolTip);

//     circlesGroup.on("mouseover", function (data) {
//         toolTip.show(data);
//     });
//     circlesGroup.on("mouseout", function (data, index) {
//         toolTip.hide(data);
//     });

//     return circlesGroup;
// };


// d3.csv('assets/data/data.csv').then(data => {
//     console.log(data[10]);
// })

