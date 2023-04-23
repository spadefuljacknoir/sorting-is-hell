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
    // Встановлює атрибут x кожного елемента rect на значення, кратне 50, на основі його індексу в масиві даних (i).
    .attr("x", (d, i) => i * 50) 
    // Встановлює атрибут y кожного елемента rect у значення, яке позиціонує його вертикально на графіку на основі значення даних d.
    .attr("y", d => 300 - Math.max(d * 3, 1))
    // Встановлює атрибут width кожного елемента rect у фіксоване значення 40.
    .attr("width", 40)
    // Встановлює атрибут height кожного елемента rect у значення, яке відображатиме значення даних d. 
    //Вираз Math.max(d * 3, 1) гарантує, що висота буде щонайменше 1 піксель, навіть якщо значення даних дорівнює 0.
    .attr("height", d => Math.max(d * 3, 1))
    .attr("fill", "red"); // set the fill color to red

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
      bubbleSort(data, rects, labels);
    });
}

function bubbleSort(data, rects, labels) {

  
  if (isSorting) {
    return; // if sorting is already running, do nothing
  }

  isSorting = true; // set the flag to true to indicate that sorting is starting
  let swapped = false;
  let iteration = 0;

  function doIteration() {
    swapped = false;
    for (let i = 0; i < data.length - iteration - 1; i++) {
      // Select the two rects being compared and add the "compare" class to them
  
      if (data[i] > data[i + 1]) {
        // Use destructuring to swap the values
        [data[i], data[i + 1]] = [data[i + 1], data[i]];
  
        rects.data(data)
          .transition()
          .duration(500)
          .delay(500 * iteration + i * 500)
          .attr("x", (d, j) => j * 50)
          .attr("y", d => 300 - Math.max(d * 3, 1))
          .attr("height", d => Math.max(d * 3, 1));
  
        labels.data(data)
          .transition()
          .duration(500)
          .delay(500 * iteration + i * 500)
          .attr("x", (d, j) => j * 50 + 20)
          .attr("y", d => 295 - Math.max(d * 3, 1))
          .text(d => d);
  
        swapped = true;
      }
    }
      
    const lastIndex = data.length - iteration - 1;
    rects.filter((d, i) => i === lastIndex)
    .attr("class", "sorted");

    iteration++;
  }
  
  const intervalId = setInterval(() => {
    doIteration();
    if (!swapped) {
      clearInterval(intervalId);
      isSorting = false; // set the flag to false to indicate that sorting is finished
      rects.attr("class", ""); // remove the "sorted" class from all elements
    }
  }, 4000);
}

// Add event listener to stop sorting when "update" button is clicked
d3.select("#update")
.on("click", updateChart);

updateChart();
let isSorting = false; // flag to indicate whether the sorting process is running