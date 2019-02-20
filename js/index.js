data = [
   {'Name': 'Interactive Data Viz', 'Price': 39.71},
   {'Name': 'Bluetooth Ear Tips', 'Price': 9.99},
   {'Name': 'Pop up Greeting card', 'Price': 7.99},
   {'Name': 'Laundry Hamper', 'Price': 14.26},
   {'Name': 'Shoelaces', 'Price': 7.12},
   {'Name': 'Kitchen Trash Bags', 'Price': 5.24},
   {'Name': 'Melatonin', 'Price': 8.35},
   {'Name': 'Pixel 2 headphone adapter', 'Price': 19.99},
   {'Name': 'Replacement laptop keyboard', 'Price': 56.05},
   {'Name': '4.4 lbs brown rice', 'Price': 34.82},
   {'Name': 'Dishwasher tablets', 'Price': 10.39},
   {'Name': 'Ethernet cable', 'Price': 7.49},
   {'Name': 'Dog poop bags', 'Price': 15.95},
   {'Name': 'Sensodyne toothpaste', 'Price': 14.76},
   {'Name': 'Deodorant 4 pk', 'Price': 16.38},
   {'Name': 'Garage door opener', 'Price': 24.5},
   {'Name': 'Massage Lacross Balls', 'Price': 9.99},
   {'Name': "Levi's 541 Athletic fit jeans", 'Price': 54.99},
   {'Name': 'PopSockets Collapsible Grip & stand for phone', 'Price': 9.89},
   {'Name': 'Mastering PyCharm', 'Price': 35.99},
   {'Name': 'SQL Cookbook', 'Price': 33.29},
   {'Name': 'Angler broom & dust pan', 'Price': 19.99},
   {'Name': 'LED 40 Watt light bulbs', 'Price': 16.99}
];

prices = data.map(d => d['Price'])
names = data.map(d => d['Name'])

var margin = { left: 20, right: 20, bottom: 200, top: 0};
var svgHeight = 440,
    barWidth = 20,
    svgWidth = ((barWidth + 1) * data.length) + margin.left;


var priceScale = d3.scaleLinear()
  .domain([0, d3.max(prices) + 10])
  .range([0, svgHeight - margin.top - margin.bottom]);

svg = d3.select("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


// Create group elements for each price
var bars = svg.selectAll("g")
  .attr("class", "price")
  .data(prices)
  .enter()
  .append("g");

// Append a rectange to each group element,
// using the rescaled price as the height
bars.append("rect")
  .attr("width", barWidth)
  .attr("height", d => priceScale(d))
  .attr("fill", "darkblue")
  .attr("x", (d, i) => (barWidth + 1) * i + margin.left)
  .attr("y", d => svgHeight - priceScale(d) - margin.bottom);

// Add text on top of each bar to enhance clarity
bars.append("text")
  .attr("y", d => priceScale(d3.max(prices)) - priceScale(d) + 32)
  .attr("x", (d, i) => (i + 1) * (barWidth + 1) + margin.left)
  .attr("fill", "black")
  .attr("font-family", "sans-serif")
  .attr("font-size", "8px")
  .attr("text-anchor", "end")
  .text(d => d);

// Add the y Axis. I have to create a new scale because the original scale is down => up i.o. up => down
var yAxisScale = d3.scaleLinear()
  .domain([0, d3.max(prices) + 10])
  .range([svgHeight - margin.bottom, 0]);

var yAxis = d3.axisLeft()
  .scale(yAxisScale)
  .ticks(5);

 
svg.append("g")
  .attr("class", "yAxis")
  .attr("transform", "translate(" + margin.left + "," + 0 +")")
  .call(yAxis);

var xAxisScale = d3.scaleBand()
  .domain(names)
  .range([0, barWidth * (prices.length + 1)]);

var xAxis = d3.axisBottom()
  .scale(xAxisScale);

svg.append("g")
  .attr("class", "xAxis")
  .call(xAxis)
  .attr("transform", "translate(" + 10 + "," + (svgHeight - margin.bottom) +")")
  .selectAll("text")
    .attr("transform", "translate(0, 10)rotate(-90)")
    .attr("text-anchor", "end")
;