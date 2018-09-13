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
var svgWidth = 500, svgHeight = 750, barPadding = 5;
var barWidth = (svgWidth / actualData.length);

// Find the minimum and maximum height for the bars.
// Only using maxDataPoint currently. un-comment minDataPoint and replace 0
// like so:
// ...scaleLinear().domain([minDataPoint,maxDataPoint])...
//
// var minDataPoint = d3.min(actualData);
var maxDataPoint = d3.max(goalData);
// Scale bars down to range specified.
var linearScale = d3.scaleLinear()
                           .domain([0,maxDataPoint])
                           .range([0,svgHeight - 20]);

for (var i = 0; i < actualData.length; i++) {
  actualScaledData[i] = linearScale(actualData[i]);
  goalScaledData[i] = linearScale(goalData[i]);
  deltaScaledData[i] = linearScale(deltaData[i]);

}

// D3 select SVG by class 'chart1' and set height and width
var svg = d3.select('.chart1')
.attr("width", svgWidth)
.attr("height", svgHeight);
// create <g> container for goal bars to hold rect and text
var goal = svg.selectAll(".goalnode")
    .data(goalScaledData)
    .enter().append("g")
    .attr("class", "goalnode")
    .attr("transform", function (d, i) {
        return "translate("+ ((barWidth * i) + 1) + " " + (svgHeight - d) +")";
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
    .attr("dx", barWidth / 2)
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
        return "translate("+ (barWidth * i) + " " + (svgHeight - goalScaledData[i]) +")";
        } else {
        return "translate("+ (barWidth * i) + " " + (svgHeight - d) +")";
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
    .attr("dx", barWidth / 2)
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

