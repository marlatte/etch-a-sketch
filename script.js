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
	
		gridContainer.appendChild(square);
	}
	let squares = document.querySelectorAll(".square");
	squares.forEach(square => {
		square.addEventListener("mouseenter", () => {
			square.classList.add("triggered");
			if (getComputedStyle(square).backgroundColor === "rgb(255, 255, 255)") {
				square.style.backgroundColor = "#" + getRandomColor();
			} else {
				let firstColor = getHexColor(getComputedStyle(square).backgroundColor);
				let newColor = LightenDarkenColor(firstColor, -10);
				square.style.backgroundColor = "#" + newColor;
			}
		});
	});
}
drawGrid(squaresPerSide);


const redraw = document.querySelector("#redraw");
redraw.addEventListener("click", redrawGrid);

const clearBoard = document.querySelector("#clearBoard");
clearBoard.addEventListener("click", () => {
	removeAllChildNodes(gridContainer);
	drawGrid(squaresPerSide);
});

function redrawGrid() {
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

function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = "";
	for (let i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
  }

  function getHexColor(color){
	// H/T to StackOverflow user jave.web for this one.
    //if color is already in hex, just return it...
    if( color.toString().length == 6 ) return color;
    
    //leave only "R,G,B" :
    color = color
                .replace("rgba", "") //must go BEFORE rgb replace
                .replace("rgb", "")
				.replace("(", "")
                .replace(")", "");
    color = color.split(","); // get Array["R","G","B"]
    
    // 0) add leading #
    // 1) add leading zero, so we get 0XY or 0X
    // 2) append leading zero with parsed out int value of R/G/B
    //    converted to HEX string representation
    // 3) slice out 2 last chars (get last 2 chars) => 
    //    => we get XY from 0XY and 0X stays the same
    return  ""
            + ( '0' + parseInt(color[0], 10).toString(16) ).slice(-2)
            + ( '0' + parseInt(color[1], 10).toString(16) ).slice(-2)
            + ( '0' + parseInt(color[2], 10).toString(16) ).slice(-2);
}

  function LightenDarkenColor(firstColor, percentChange) {
	// h/t StackOverflow user Pimp Trizkit
	let num = parseInt(firstColor, 16);
	let r = (num >> 16) * (1 + (percentChange / 100));
	let b = ((num >> 8) & 0x00FF) * (1 + (percentChange / 100));
	let g = (num & 0x0000FF) * (1 + (percentChange / 100));
	let newColor = g | (b << 8) | (r << 16);
	newColor = newColor.toString(16);
	while (newColor.length < 6) {
		newColor = "0" + newColor;
	}
	return newColor;
  }