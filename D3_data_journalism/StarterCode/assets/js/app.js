d3.select('#scatter').style('border','2px solid black');
var width = parseFloat(d3.select('#scatter').style('width'));
var height = .66*width;
var svg = d3.select('#scatter').append('svg').attr('width',width).attr('height',height);

var xText = svg
        .append('g')
        .attr('transform',`translate(${width/2},${.97*height})`);

    xText
        .append('text')
        .text('Household Income (Median)')
        .attr('class','aText inactive x')
        .attr('data-value','income');

    xText
        .append('text')
        .attr('y',-20)
        .text('Age (Median)')
        .attr('class','aText inactive x')
        .attr('data-value','age');

    xText
        .append('text')
        .attr('y',-40)
        .text('In Poverty (%)')
        .attr('class','aText active x')
        .attr('data-value','poverty');

var yText = svg
        .append('g')
        .attr('transform',`translate(${.02*width},${height/2})rotate(-90)`)

    yText
        .append('text')
        .text('Obese (%)')
        .attr('class','aText inactive y')
        .attr('data-value','obesity');

    yText
        .append('text')
        .attr('y', 20)
        .text('Smokers (%)')
        .attr('class','aText inactive y')
        .attr('data-value','smokes');

    yText
        .append('text')
        .attr('y', 40)
        .text('Lacks Healthcare (%)')
        .attr('class','aText active y')
        .attr('data-value','smokes');

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

d3.csv('assets/data/data.csv').then(data=>{
            console.log(data[10]);
        })