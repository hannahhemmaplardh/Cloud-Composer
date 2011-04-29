var PIANO = 1;
var GUITAR = 2;
var DRUM = 3;
var TRUMPET = 4;
var VIOLIN = 5;

var instrumentsOrder = ["noop", "piano", "guitar", "drum", "trumpet", "violin"];	// order of instruments to be displayed in
var currentInstrument = DRUM;
	
function loadInstruments() {
	var bar = document.getElementById("instrumentBar");
	for (var i=1; i < instrumentsOrder.length; i++) {
		var img = document.createElement("span");
		img.className = "instrumentContainer";
		img.style.backgroundImage = "url(images/"+instrumentsOrder[i]+".png)";
		
		bar.appendChild(img);
	}
}	

