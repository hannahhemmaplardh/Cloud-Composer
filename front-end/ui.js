
////////// CONSTANTS
// These constants must be changed in CSS as well
var size = 40;						// Size of a square
var margin = 1;						// Margin for the square
var border = 1;						// border of a square
var measureSeparation = 4;			// gap between measures in pixels
var instrumentSize = 16;			// size of a single image

// Normal constants
var pitches = 5;					// number of pitches (squares) in a column
var octaves = 2;					// number of octaves
var octaveMargin = 4;
var measureWidth = 4;				// number of squares in a measure
var extenderWidth = 24;				// width of the extender bar
var appendBy = 2;					// number of measures to append at a time
var instrumentOffset = 2;			// stack distancei
var noteColor = "#CCCCCC";			// 
var extenderOverColor = "#EEEEEE";	// 
var extenderColor = "#CCCCCC";		// 
var scrollbarOffsets = 20;			//

var NOTA = 0;		// no selection
var PIANO = 1;
var GUITAR = 2;
var DRUM = 3;
var TRUMPET = 4;
var VIOLIN = 5;


// computed values
var size = size + 2*border; 			// actual size including borders
var h = size*pitches*octaves + margin*pitches*octaves; 	// height of a column
var w = (margin+size)*20; 				// the visible section of the grid


// initiated values
var notes = new Array();			// array that contains all the notes
var numColumns = 0;					// current number of columns

var instrumentsOrder = [PIANO, GUITAR, DRUM, TRUMPET, VIOLIN];	// order of instruments to be displayed in
var currentInstrument = DRUM;
	
	
// call this onload
function setEvents() {
	document.body.addEventListener("click", mouseClick, false);
//	document.body.addEventListener("mouseover", rollOver, false);
//	document.body.addEventListener("mouseout", rollOut, false);
}


function createSquare(loc_y) {
	var sq = document.createElement("div");
	
	sq.className = "grid_square";
	sq.id = loc_y;
	
	return sq;

}

function createOctave(octaveID) {
	var octave = document.createElement("div");
	octave.style.overflow = "hidden";
	
	for (var i=octaveID*pitches; i<octaveID*pitches + pitches; i++) {
		octave.appendChild(createSquare(i));
	}

	return octave;
}

function createColumn(loc_x) {
	var column = document.createElement("div");
	column.id = loc_x;

	column.style.width = size + "px";
	column.style.height = octaveMargin + h + "px";
	

	for (var i=0; i<octaves; i++) {
		column.appendChild(createOctave(i));
	}

	return column;
}

function createMeasure(numMeasure) {
	var measure = document.createElement("div");

	measure.style.width = ((size+margin)*measureWidth) + "px";
	measure.style.height = h + "px";
	

	for (var i=measureWidth*numMeasure; i<measureWidth*numMeasure+measureWidth; i++) {
		measure.appendChild(createColumn(i));
	}

	return measure;
}

function createExtender() {
	var btn = document.createElement("div");
	btn.id = "extender";

	btn.style.width = extenderWidth + "px";
	btn.style.height = (h-1) + "px";
	
	return btn;
}

function createGrid(cols) {
	var innerGrid = document.createElement("div"); 	
	var tempW = cols*size + cols*margin + measureSeparation*cols/measureWidth + extenderWidth + 4;	//need to also calculate extra margin

	innerGrid.id = "inner_grid";	
	innerGrid.style.width = tempW + "px";
	innerGrid.style.height = h + "px";


	for (var j=0; j<cols/measureWidth; j++) {
		innerGrid.appendChild(createMeasure(j));
	}
	
	// button
	innerGrid.appendChild(createExtender());
	numColumns = cols;
	
	return innerGrid;
}


// creates an image of an instrument.
function createInstrumentSquare(instrumentID) {
	var listenForEvent = instrumentID == 0 ? true : false;
	var innerSquare = document.createElement("span");
	
	return innerSquare;
}


function mouseClick(event) {
	var current = event.target;
	if (current.className == "grid_square") { 
		var column = current.parentNode.parentNode;
	
		var index = checkNote(column.id, current.id)
		if (index != -1) {
			current.style.backgroundColor = "transparent";
			notes.splice(index, 1);
		} else {
			current.style.backgroundColor = noteColor;
			notes.push(column.id+":"+current.id);
		}
	} else if (current.id == "extender") {
		/// APPend columns, make sure to check if you are at the limit later
		/// MUST APPEND ALL COLUMNS
		var innerGrid = document.getElementById('inner_grid');
		innerGrid.removeChild(current);			//remove extender bar
		
		for (var i=numColumns/measureWidth; i<numColumns/measureWidth+appendBy; i++) {
			innerGrid.appendChild(createMeasure(i));
		}
		
		innerGrid.appendChild(current);			// add back extender bar
		innerGrid.style.width = (innerGrid.offsetWidth + appendBy*((measureWidth*(size+margin))+measureSeparation)) + "px";	// reset width of innergrid
		
		numColumns = numColumns+appendBy*measureWidth;
		
		// bug fix, onmouseout never gets detected when appending columns:
		current.style.backgroundColor = extenderColor;
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


function checkNote(a, b) {
	var string = a+":"+b;
	for (var i = 0; i < notes.length; i++) {
		if (notes[i] == string) {
			return i;
		}
	}
	return -1;
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
	grid.style.width = w + "px";
	grid.style.height = scrollbarOffsets + h + "px";
	grid.appendChild(createGrid(100));
	
}


///////// FUNCTION CALLs
	
	
/// LOAD events
window.onload = loadUI;


	
	
