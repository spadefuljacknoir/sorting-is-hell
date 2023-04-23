const margin = { top: 20, right: 0, bottom: 0, left: 20 };
const svg = d3.select("#chart")
  .append("svg")
  .attr("width", 500 + margin.left + margin.right)
  .attr("height", 500 + margin.top + margin.bottom)

function updateChart() {
  let data = [];
  for (let i = 0; i < 10; i++) {
    data.push(Math.floor(Math.random() * 50));
  }

  const rects = svg.selectAll("rect")
    .data(data);

  rects.enter()
    .append("rect")
    .attr("x", (d, i) => i * 50)
    .attr("y", d => 300 - Math.max(d * 3, 1))
    .attr("width", 40)
    .attr("height", d => Math.max(d * 3, 1));

  rects.transition()
    .duration(1000)
    .attr("y", d => 300 - Math.max(d * 3, 1))
    .attr("height", d => Math.max(d * 3, 1));

  rects.exit()
    .remove();

  const labels = svg.selectAll("text")
    .data(data);

  labels.enter()
    .append("text")
    .attr("x", (d, i) => i * 50 + 20)
    .attr("y", d => 295 - Math.max(d * 3, 1))
    .attr("text-anchor", "middle")
    .text(d => d);

  labels.transition()
    .duration(1000)
    .attr("y", d => 295 - Math.max(d * 3, 1))
    .text(d => d);

  labels.exit()
    .remove();

  d3.select("#sort")
    .on("click", () => {
      data = bubbleSort(data);
      rects.data(data)
        .transition()
        .duration(1000)
        .attr("x", (d, i) => i * 50)
        .attr("y", d => 300 - Math.max(d * 3, 1))
        .attr("height", d => Math.max(d * 3, 1));

      labels.data(data)
        .transition()
        .duration(1000)
        .attr("x", (d, i) => i * 50 + 20)
        .attr("y", d => 295 - Math.max(d * 3, 1))
        .text(d => d);
    });
}

d3.select("#update")
.on("click", updateChart);

updateChart();


function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
        }
      }
    }
    return arr;
  }