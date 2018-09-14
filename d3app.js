// Select tag IDs that start with the words goal and actual respectively.
var goalSelect = document.querySelectorAll('[id^=goal]');
var actualSelect = document.querySelectorAll('[id^=actual]');

// Define arrays to populate with the selected IDs data
var actualData = [];
var goalData = [];
var deltaData = [];
var deltaScaledData = [];
var actualScaledData = [];
var goalScaledData = [];

// goalIds array will be used to describe the bars by part ID
// i.e. goal_88539
var goalIds = [];

// Populate arrays with for loop
for (let i = 0; i < goalSelect.length; i++) {
    goalData[i] = parseInt(goalSelect[i].textContent);
    goalIds[i] = goalSelect[i].id;
    actualData[i] = parseInt(actualSelect[i].textContent);
}

//Find delta (parts left to build)
deltaData = goalData.map(function(item, index) {
    return item - actualData[index];
});

//Set the height of the SVG element, the width of  the SVG element and
// bars, and the padding between bars
var barPadding = actualData.length;
    margin = {top:20, right: 20, bottom: 30, left: 50 /*Minimum of 40*/},
    // Make responsive by getting width from HTML DOM
    svgWidth = 700 - margin.left - margin.right,
    svgHeight = 750 - margin.top - margin.bottom;
var barWidth = ((svgWidth - margin.left) / actualData.length);

// Find the minimum and maximum height for the bars.
// Only using maxDataPoint currently. un-comment minDataPoint and replace 0
// like so:
// ...scaleLinear().domain([minDataPoint,maxDataPoint])...
//
// var minDataPoint = d3.min(actualData);
var maxDataPoint = d3.max(goalData);
// Scale bars down to range specified.
var linearScale = d3.scaleLinear()
                           .domain([0,maxDataPoint + margin.top])
                           .range([0,svgHeight - margin.top]);

for (var i = 0; i < actualData.length; i++) {
    actualScaledData[i] = linearScale(actualData[i]);
    goalScaledData[i] = linearScale(goalData[i]);
    deltaScaledData[i] = linearScale(deltaData[i]);
}

// Create the axis
var axisScale = d3.scaleLinear()
                        .domain([0, maxDataPoint + margin.top])
                        .range([svgHeight - margin.top,0]);
var xAxis = d3.axisRight()
                .scale(axisScale);




// D3 select SVG by class 'chart1' and set height and width
var svg = d3.select('.chart1')
.attr("width", svgWidth)
.attr("height", svgHeight)
.append("g")
.call(xAxis);
// create <g> container for goal bars to fold rect and text
var goal = svg.selectAll(".goalnode")
    .data(goalScaledData)
    .enter().append("g")
    .attr("class", "goalnode")
    .attr("transform", function (d, i) {
        return "translate("+ ((barWidth * i) + 1 + margin.left) + " " + (svgHeight - d - margin.top) +")";
    });

// create <rect> to represent the bars
goal.append("rect")
    .attr("height", function(d) {
        return d;
    })
    .attr("width", (barWidth - barPadding) - 2);
// create <text> to display goal
goal.data(goalData)
    .append("text")
    .text(function(d){
        return d;
    })
    .attr("dx", (barWidth - barPadding) / 2)
    .attr("dy", "-.2em");
// create <g> container for actual bars to hold rect and text
var bar = svg.selectAll(".barnode")
    .data(actualScaledData)
    .enter().append("g")
    .attr("class", "barnode")
    .attr("id", function(d, i){
        return "bar" + i;
    })
    .attr("transform", function (d, i) {
        if (d > goalScaledData[i]) {
        return "translate("+ ((barWidth * i) + margin.left) + " " + (svgHeight - goalScaledData[i]) +")";
        } else {
        return "translate("+ ((barWidth * i) + margin.left) + " " + (svgHeight - d - margin.top) +")";
        }
    });
// create <rect> to represent the bars
bar.append("rect")
    .attr("fill", function(d, i) {
        if (d >= goalScaledData[i]) {
            return "lime";
        }
    })
    .attr("height", function(d, i) {
        if (d > goalScaledData[i]) {
            return goalScaledData[i];
        } else {
            return d;
        };
    })
    .attr("width", barWidth - barPadding)
// create <text> to display goal
bar.data(deltaData)
    .append("text")
    .text(function(d){
        if(d <= 0) {
            return (-d);
        } else {
        return "-" + d;
        }
    })
    .attr("dx", (barWidth - barPadding) / 2)
    .attr("dy", function(d, i){
        // conditional statement used to position text inside the bar
        // if it gets to a delta of less than 25.
        var textCeiling = (actualData[i] / goalData[i]) * 100;
        if (d <= textCeiling){
           return "1em";
        } /*else if (d == 0) {
            return "1em";
        }*/else {
            return "-0.3em";
        }
    });

