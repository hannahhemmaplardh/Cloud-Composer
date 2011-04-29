
////////// CONSTANTS
// These constants must be changed in CSS as well
var raw_size = 40;					// Size of a square
var margin = 1;						// Margin for the square
var border = 1;						// border of a square
var measureSeparation = 4;			// gap between measures in pixels
var instrumentSize = 16;			// size of a single image

// Normal constants
var pitches = 5;					// number of pitches (squares) in a column
var octaves = 2;					// number of octaves
var octaveMargin = 4;
var measureWidth = 16;				// number of squares in a measure
var extenderWidth = 24;				// width of the extender bar
var appendBy = 2;					// number of measures to append at a time
var instrumentOffset = 2;			// stack distancei
var noteColor = "#CCCCCC";			// 
var extenderOverColor = "#EEEEEE";	// 
var extenderColor = "#444444";		// 
var scrollbarOffsets = 20;			//
var selectorHeight = 14;			//

// computed values
var size = raw_size + 2*border; 			// actual size including borders
var h = size*pitches*octaves + margin*pitches*octaves + selectorHeight; 	// height of a column
var w = (margin+size)*20; 				// the visible section of the grid

// call this onload
function setEvents() {
	document.body.addEventListener("click", mouseClick, false);
//	document.body.addEventListener("mouseover", rollOver, false);
//	document.body.addEventListener("mouseout", rollOut, false);
}


function mouseClick(event) {
	var current = event.target;
	if (current.className == "grid_square") { 
		useNote(current, current.parentNode.parentNode);
		
	} else if (current.id == "extender") {
		extendGrid(current);
	}

}

function rollOver(event) {
	var current = event.target;
	if (current.className == "grid_square") {  
		var square = event.target;
		var column = square.parentNode;
	
		square.style.backgroundColor = noteColor;
	} else if (current.id == "extender") {
		current.style.backgroundColor = extenderOverColor;
	}
}

function rollOut(event) { 
	var current = event.target;
	if (current.className == "grid_square") { 
		var square = event.target;
		var column = square.parentNode;

		if (checkNote(column.id, square.id) == -1) {
			square.style.backgroundColor = "transparent";
		}
	} else if (current.id == "extender") {
		current.style.backgroundColor = extenderColor;
	}createGrid(100);
}


function printNotes() {
	document.getElementById('output').textContent = notes;
}

function sortAndPrintNotes() {
	document.getElementById('output').textContent = notes.sort();
}

function loadUI() {
	setEvents();
	
	// create Grid
	var grid = document.getElementById("grid");
	grid.style.height = scrollbarOffsets + h + "px";
	grid.appendChild(createGrid(112));	// must be multiple of 16
	
	loadInstruments();
	
}


///////// FUNCTION CALLs
	
	
/// LOAD events
window.onload = loadUI;


	
	
