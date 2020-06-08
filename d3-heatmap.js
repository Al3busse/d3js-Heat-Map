var height = 500;
var width = 900;

var url =
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";

var colours = [
  "#781c81",
  "#452d8a",
  "#4063b0",
  "#4b91c0",
  "#62ac9a",
  "#83ba6d",
  "#abbe51",
  "#ceb641",
  "#e39a36",
  "#e6642c",
  "#d92120",
];

var svgContainer = d3
  .select(".graphContainer")
  .append("svg")
  .attr("width", width + 100)
  .attr("height", height + 100);

d3.json(url, function (err, data) {
  if (err) throw error;

  //x axis

  var xScale = d3.scaleLinear().domain().range();

  var xAxis = d3.axisBottom(xScale);

  var xAxisGroup = svgContainer
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr("transform", "translate(0,0)");

  //y axis

  var yScale = d3.scaleTime().domain().range();

  var yAxis = d3.axisLeft(yScale);

  var yAxisGroup = svgContainer
    .append("g")
    .call(yAxis)
    .attr("id", "y-axis")
    .attr("transform", "translate(0,0)");

  // ylabel

  // tooltip

  var tooltip = d3
    .select(".graphContainer")
    .append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip")
    .style("opacity", 0);

  // graph

  d3.select("svg")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x")
    .attr("y")
    .attr("width")
    .attr("height")
    .attr("rx", 0)
    .attr("ry", 0)
    .attr("class", "cell")
    .attr("data-month")
    .attr("data-year")
    .attr("data-temp")
    .style("fill")
    .attr("transform", "translate(60,50)")
    .on("mouseover", function (d) {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .attr()
        .html()
        .attr("data-year")
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mouseout", function (d) {
      tooltip.style("opacity", 0);
    });

  // legend

  var legendContainer = svgContainer.append("g").attr("id", "legend");
});
