// .attr("d", function(d, i) {
    //     var startPos = barWidth * i;
    //     var goalLineWidth = startPos + (barWidth - barPadding);
    //     var goalLineY = svgHeight - d;
    //     return "M" + startPos + " " + goalLineY + " H" + goalLineWidth + " V" +
    //     svgHeight + " H" + startPos + " Z";
    // });
    // .attr("x", function(d, i){
    //     var startPosition = barWidth * i;
    //     return startPosition; // figure out how to scale
    // })
    // .attr("y", svgHeight - 4);

    // .attr("y", function(d) {
    //     return svgHeight - d;
    // });
// var goalLabels = svg.selectAll("rect")
//     .data(goalData)
//     .enter().append("text")
//     .text(function(d) {
//         return d
//     })


    // .data(actualData)
    // .enter().append("text")
    // .text(function(d) {
    //     return d
    // })


// var goalLine = svg.selectAll("path")
//     .data(goalScaledData)
//     .enter().append("path")
//     .attr("fill", "rgba(100 ,100 ,100 , 0.2)")
//     .attr("d", function(d, i) {
//         var startPos = barWidth * i;
//         var goalLineWidth = startPos + (barWidth - barPadding);
//         var goalLineY = svgHeight - d;
//         return "M" + startPos + " " + goalLineY + " H" + goalLineWidth;
//     })
//     .transition()
//     .duration(1000)
//     .ease(d3.easeLinear)
//     .style("stroke", "lime")
//     .style("stroke-width", "2");

// var barChart = svg.selectAll("rect")
//     .data(actualScaledData)
//     .enter().append("rect")
//     .lower()
//     .attr("y", function(d) {
//         return svgHeight - d;
//     })
//     .attr("height", function(d) {
//         return d;
//     })
//     .attr("width", barWidth - barPadding)
//     .attr("transform", function (d, i) {
//         var translate = [barWidth * i, 0];
//         return "translate("+ translate +")";
//     })
//     .attr("class", "actualbar")


    // .style("fill", "rgba(0, 0, 0, 0)")
    // .transition(t)
    // .selectAll("rect")
    // .data(goalScaledData)
    // .enter()
    // .append("rect")
    // .style("fill", "rgba(0, 0, 0, 1)")
    // .attr("y", function(d) {
    //     return svgHeight - d;
    // })
    // .attr("height", function(d) {
    //     return d;
    // })
    // .attr("width", barWidth - barPadding)
    // .attr("transform", function (d, i) {
    //     var translate = [barWidth * i, 0];
    //     return "translate("+ translate +")";
    // })
    // ;

// var t = d3.transition()
// .duration(1000)
// .ease(d3.easeLinear);

// https://stackoverflow.com/questions/45342155/how-to-subtract-one-array-from-another-in-javascript
