function generateArray() {
    var minValue = parseInt(document.getElementById("min-value").value);
    var maxValue = parseInt(document.getElementById("max-value").value);
    var length = Math.floor(Math.random() * 20) + 5; // Generate a random array length between 5 and 25
    var arr = [];
    for (var i = 0; i < length; i++) {
        var num = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue - 1;
        arr.push(num);
    }
    document.getElementById("input-array").value = arr.join(",");
}

function sort() {
    // Get the input array from the user
    var input = document.getElementById("input-array").value;
    var arr = input.split(",").map(function(item) {
        return parseInt(item, 10);
    });

    // Determine the minimum value in the array
    var min = Math.min(...arr) - 1;

    // Visualize the initial state of the array
    var barsDiv = document.getElementById("bars");
    barsDiv.innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
        var bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = (arr[i] - min + 1) * 10 + "px";
        var label = document.createElement("span");
        label.className = "label";
        label.innerText = arr[i];
        bar.appendChild(label);
        barsDiv.appendChild(bar);
    }

    // Get the speed slider element and set the initial interval time
    var speedSlider = document.getElementById("speed-slider");
    var intervalTime = speedSlider.value;

    
    // // Get the speed label element and set its initial text content
    // var speedLabel = document.getElementById("speed-label");
    // speedLabel.innerText = speedSlider.value;

    // Perform bubble sort and visualize each step
    var i = 0;
    var j = 0;
    var interval = setInterval(function() {
        // Highlight the bars being compared
        var bar1 = barsDiv.children[j];
        var bar2 = barsDiv.children[j + 1];
        bar1.className += " selected";
        bar2.className += " selected";

        // Swap the bars if necessary
        if (arr[j] > arr[j + 1]) {
            var temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;

            // Update the heights of the bars to reflect the new state of the array
            bar1.style.height = (arr[j] - min + 1) * 10 + "px";
            bar2.style.height = (arr[j + 1] - min + 1) * 10 + "px";

            // Update the labels of the bars to reflect the new state of the array
            var label1 = bar1.querySelector(".label");
            var label2 = bar2.querySelector(".label");
            label1.innerText = arr[j];
            label2.innerText = arr[j + 1];
        }

        // Check if the current element is in its final sorted position
        if (j + 1 >= arr.length - i - 1) {
            bar2.className += " sorted";
        }

        // Remove the highlighting from the bars
        setTimeout(function() {
            bar1.className = bar1.className.replace(" selected", "");
            bar2.className = bar2.className.replace(" selected", "");

            // Move to the next pair of bars
            j++;
            if (j >= arr.length - i - 1) {
                j = 0;
                i++;
                if (i >= arr.length - 1) {
                    // Sort is complete, change color of last element if not already red
                    var lastBar = barsDiv.children[barsDiv.children.length - 1];
                    if (!lastBar.classList.contains("sorted")) {
                        lastBar.classList.add("sorted");
                    }
                    clearInterval(interval);
                }
            }
        }, intervalTime);
    // Set the new interval time based on the speed slider value
}, intervalTime = speedSlider.value);
}

