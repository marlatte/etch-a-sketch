const gridContainer = document.querySelector(".grid-container");
let squaresPerSide = 16;
let gridSidePixelsRaw = getComputedStyle(gridContainer).height;
let gridSidePixels = +gridSidePixelsRaw.slice(0, gridSidePixelsRaw.length - 2);

function drawGrid(squaresPerSide) {
	let squaresSidePixels = gridSidePixels / squaresPerSide;
	for (let index = 0; index < squaresPerSide**2; index++) {	
		let square = document.createElement("div");
		square.classList.add("square");
		square.style.height = `${squaresSidePixels}px`;
		square.style.width = `${squaresSidePixels}px`;
		square.style.fontSize = `${squaresSidePixels / 2.5}px`
		// square.textContent = index + 1
	
		gridContainer.appendChild(square);
	}
	let squares = document.querySelectorAll(".square");
	squares.forEach(square => {
		square.addEventListener("mouseenter", () => {
			square.classList.add("triggered");
		});
	});
}
drawGrid(squaresPerSide);


const button = document.querySelector("button");
button.addEventListener("click", redrawGrid);

function redrawGrid(squaresPerSide) {
	let answerOkay = false;
	while (!answerOkay) {
		squaresPerSide = Math.floor(+prompt("How many squares in the grid? E.g. 10x10", 10));
		if (squaresPerSide > 0 && squaresPerSide < 100) {
			answerOkay = true;
		} else {
			alert("Try again  with a number between 0 and 100.")
		}
	};
	removeAllChildNodes(gridContainer);
	drawGrid(squaresPerSide);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}