/*
- Loop in loop to create a 16x16 grid of 256 squares with sides x
- Append them in main-container and set width to x/16
*/

const gridContainer = document.querySelector(".grid-container");
let squareSideLength = 50;
let gridSideLength = 16;


for (let index = 0; index < gridSideLength**2; index++) {	
	let square = document.createElement("div");
	square.classList.add("square");
	square.style.height = `${squareSideLength}px`;
	square.style.width = `${squareSideLength}px`;
	square.textContent = index + 1

	gridContainer.appendChild(square);
}

gridContainer.style.height = `${gridSideLength * squareSideLength}px`
gridContainer.style.width = `${gridSideLength * squareSideLength}px`
