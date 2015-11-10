// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 40, bottom: 62, left: 50},
    width = 400 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y0 = d3.scale.linear().range([height, 0]);
var y1 = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(10);

var yAxisLeft = d3.svg.axis().scale(y0)
    .orient("left").ticks(5);

var yAxisRight = d3.svg.axis().scale(y1)
    .orient("right").ticks(5);


// Define area function
var area = d3.svg.area()
    .x(function(d) { return x(d.date); })
    .y0(height)
    .y1(function(d) { return y(d.close); })

// Define the line
var valueline = d3.svg.line()
    .interpolate("monotone")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y0(d.close); });

// Defines the second line
var valueline2 = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y1(d.open); })

// Adds the svg canvas
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

// Draw x gridlines
function make_x_axis() {
    return d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(5)
}

// Draw y gridlines
function make_y_axis() {
    return d3.svg.axis()
        .scale(y1)
        .orient("left")
        .ticks(5)
}

// Get the data
d3.csv("data2.csv", function(error, data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
        d.open = +d.open;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y0.domain([0, d3.max(data, function(d) { return Math.max(d.close); })])
    y1.domain([0, d3.max(data, function(d) { return Math.max(d.open); })])


    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    svg.append("path")
        .style("stroke", "red")
        .attr("d", valueline2(data));

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
              return "rotate(-65)"
            });

    // Add the X Axis label
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 2)
        .style("text-anchor", "middle")
        .text("Date");

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .style("fill", "steelblue")
        .call(yAxisLeft);

    // Add the right Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + width + " ,0)")
        .style("fill", "red")
        .call(yAxisRight);

    // Add the Y Axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height/2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Value");

    // Add a graph title above graph
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("text-decoration", "underline")
        .text("Value vs Date Graph");

    // Path labels
    // svg.append("text")
    //     .attr("transform", "translate("+(width+3)+","+y0(data[0].open)+")")
    //     .attr("dy", ".35em")
    //     .attr("text-anchor", "start")
    //     .style("fill", "red")
    //     .text("Open");

    // Path labels
    // svg.append("text")
    //     .attr("transform", "translate(" + (width+3) + "," + y0(data[0].close) + ")")
    //     .attr("dy", ".35em")
    //     .attr("text-anchor", "start")
    //     .style("fill", "steelblue")
    //     .text("Close");

    // Draw the gridlines
    svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_axis()
            .tickSize(-height, 0, 0)
            .tickFormat("")
        )

    svg.append("g")
        .attr("class", "grid")
        .call(make_y_axis()
            .tickSize(-width, 0, 0)
            .tickFormat("")
        )
});
