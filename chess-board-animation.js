const container = document.querySelector(".animation-container");

function bgChanges(element) {
    const randomColor =
        Math.random() < 0.8 ? "black" : "rgba(255, 255, 255)";
    element.style.backgroundColor = randomColor;

    if (randomColor === "rgba(255, 255, 255)") {
        element.style.opacity = 0.6; 
    } else {
        element.style.opacity = 0.9; 
    }

  
    const delay = Math.floor(Math.random() * 6000); 
    setTimeout(() => bgChanges(element), delay);
}

for (let i = 0; i < 361; i++) {
    const block = document.createElement("p");

    block.style.cssText =
        "width: 13px; height: 13px; margin: 0; padding: 0; box-sizing: border-box; transition: opacity 1s;";
    container.appendChild(block);

    // Start the color and opacity change for each block
    bgChanges(block);
}
