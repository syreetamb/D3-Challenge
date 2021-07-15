var svgWidth = 1000;
var svgHeight = 1000;

var margin ={
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
var svg = d3.select('#scatter').append('svg').attr('width',svgWidth).attr('height',svgHeight + 50);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

var chosenXAxis = " ";
var chosenYAxis = " ";
        
function xScale(data, chosenXAxis) {
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[chosenXAxis]) * 0.9,
        d3.max(data, d => d[chosenXAxis]) * 1.1
       ])
        .range([0, width]);
        
    return xLinearScale;
            
}

function yScale(data, chosenYAxis) {
        
    var yLinearScale = d3.scaleLinear()
       .domain([d3.min(data, d => d[chosenYAxis])-2, d3.max(data, d => d[chosenYAxis])+2])
       .range([height, 0]);
        
    return yLinearScale;
        
}

function renderXCircles(circlesGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
        .duration()
        .attr("d", d => newXScale(d[chosenXAxis]))
        .attr("d", d => newXScale(d[chosenXAxis]));

    return circlesGroup;
    
}

function renderYCircles(circlesGroup, newYScale, chosenYAxis) {

    circlesGroup.transition()
        .duration()
        .attr("d", d => newYScale(d[chosenYAxis]))
        .attr("d", d => newYScale(d[chosenYAxis]));

    return circlesGroup;
    
}

function renderXText(circledGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
        .duration()
        .attr("d", d => newXScale(d[chosenXAxis]));

    return circlesGroup;
    
}

function renderYText(circledGroup, newYScale, chosenYAxis) {

    circlesGroup.transition()
        .duration()
        .attr("d", d => newYScale(d[chosenYAxis]));

    return circlesGroup;
    
}

function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

    var xlabel;
    var ylabel;

    if (chosenXAxis === "") {
        xlabel = ":";
    } 
    else if (chosenXAxis === "") {
        xlabel = ":";
    }

    if (chosenYAxis === "") {
        ylabel = ":";
    }
    else if (chosenYAxis === "") {
        ylabel = ":";
    }

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .style("color", "blue")
        .style("background", "white")
        .style("border", "black")
        .style("border-width","" )
        .style("border-radius", "")
        .style("padding", "")
        .html(function(d) {
            return (`${d.state}<br>${xlabel} ${d[chosenXAxis]}%<br>${ylabel} ${d[chosenYAxis]}%`);
        });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data);
    })
    circlesGroup.on("mouseout", function(data, index) {
        toolTip.hide(data);        
    });

    return circlesGroup;
}

d3.csv('assets/data/data.csv').then(function(data,err) {
    data.forEach(d => {d.poverty = +d.poverty;
    });

    var xLinearScale = xScale(data, chosenXAxis);

    var yLinearScale = yScale(data, chosenYAxis);

    var bottomAxis = d3.axisBottom(xLinearScale);

    var leftAxis = d3.axisLeft(yLinearScale);

    var xAxis = chartGroup.append("g")
    .attr("tranform", `translate(0, ${height})`)
    .call(bottomAxis);

    var yAxis = chartGroup.append("g")
    .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("g");

    var circles = circlesGroup.append("circle")
    .attr("d", d => xLinearScale(d[chosenXAxis]))
    .attr("d", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 10)
    .classed("stateCircle", true);

    var circlesText = circlesGroup.append("text")
    .text(d => d.abbr)
    .attr("d", d => xLinearScale(d[chosenXAxis]))
    .attr("d", d => yLinearScale(d[chosenYAxis])+5)
    .classed("stateText", true);

    var xTextGroup = chartGroup
        .append('g')
        .attr('transform',`translate(${width/2},${.97*height})`);

        xText1 = xTextGroup
        .append('text')
        .text('Household Income (Median)')
        .attr('class','aText inactive x')
        .attr('data-value','income');

        xText2 = xTextGroup
        .append('text')
        .attr('y',-20)
        .text('Age (Median)')
        .attr('class','aText inactive x')
        .attr('data-value','age');

        xText3 = xTextGroup
        .append('text')
        .attr('y',-40)
        .text('In Poverty (%)')
        .attr('class','aText active x')
        .attr('data-value','poverty');

    var yTextGroup = chartGroup
        .append('g')
        .attr('transform',`translate(${.02*width},${height/2})rotate(-90)`)

        yText1 = yTextGroup
        .append('text')
        .text('Obese (%)')
        .attr('class','aText inactive y')
        .attr('data-value','obesity');

        yText2 = yTextGroup
        .append('text')
        .attr('y', 20)
        .text('Smokers (%)')
        .attr('class','aText inactive y')
        .attr('data-value','smokes');

        yText3 = yTextGroup
        .append('text')
        .attr('y', 40)
        .text('Lacks Healthcare (%)')
        .attr('class','aText active y')
        .attr('data-value','healthcare');

    d3.selectAll('.aText').on('click', function() {
        if (d3.select(this).classed('x')){
            d3.selectAll('.x').classed('active',false)
            d3.selectAll('.x').classed('inactive',true)
        } else {
            d3.selectAll('.y').classed('active',false)
            d3.selectAll('.y').classed('inactive',true)
        };
        d3.select(this).classed('inactive',false);
        d3.select(this).classed('active',true);
    });

});

d3.csv('assets/data/data.csv').then(data=>{
            console.log(data[10]);
        })

