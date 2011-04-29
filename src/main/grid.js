// Contains functions related to the grid


// initiated values
var notes = new Array();			// array that contains all the notes
var numColumns = 0;					// current number of columns

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

/* column includes a selector at the top */
function createColumn(loc_x) {
	var column = document.createElement("div");
	column.id = loc_x;

	column.style.width = size + "px";
	column.style.height = octaveMargin + h + "px";
	
	// create selector bar
	column.appendChild(document.createElement("button"));

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
	var tempW = cols*(size + margin) + measureSeparation*cols/measureWidth + extenderWidth + 4;	//need to also calculate extra margin

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

function useNote(square, column) {
	var index = checkNote(column.id, square.id);
	if (index != -1) {
		square.style.backgroundColor = "transparent";
		notes.splice(index, 1);
	} else {
		square.style.backgroundColor = noteColor;
		notes.push(column.id+":"+square.id);
	}
}

function extendGrid(bar) {
	/// APPend columns, make sure to check if you are at the limit later
	/// MUST APPEND ALL COLUMNS
	var innerGrid = document.getElementById('inner_grid');
	innerGrid.removeChild(bar);			//remove extender bar
	
	for (var i=numColumns/measureWidth; i<numColumns/measureWidth+appendBy; i++) {
		innerGrid.appendChild(createMeasure(i));
	}
	
	innerGrid.appendChild(bar);			// add back extender bar
	innerGrid.style.width = (innerGrid.offsetWidth + appendBy*((measureWidth*(size+margin))+measureSeparation)) + "px";	// reset width of innergrid
	
	numColumns = numColumns+appendBy*measureWidth;
	
	// bug fix, onmouseout never gets detected when appending columns:
	bar.style.backgroundColor = extenderColor;
}

/* checks if a note is already placed */
function checkNote(a, b) {
	var string = a+":"+b;
	for (var i = 0; i < notes.length; i++) {
		if (notes[i] == string) {
			return i;
		}
	}
	return -1;
}

