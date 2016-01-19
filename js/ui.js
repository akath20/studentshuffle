
//buttons
$("#addNameButton").click(function() {

	var value = $('#nameInput').val();
	addItem(value);

	//clear value
	$('#nameInput').val('');


});

$("#buildResultsButton").click(function() {

	//validate first
	if (data.length < 4) {
		alert('You need at least 4 students to use this tool.')
	} else {
		buildResultsTable();
	}

	
	
});

$("#clearButton").click(function() {

	//delete data
	data = [];

	buildInputTable();
	
});

$("#importData").click(function() {
	$('#importFile').trigger('click');
});

$("#exportData").click(function() {

	this.href = 'data:plain/text,' + JSON.stringify(data);

});

//if enter key clicked
$('#nameInput').keypress(function (e) {
  if (e.which == 13) {
     $('#addNameButton').trigger('click');
  }
});


///import data 
function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
    console.log(event.target.result);
    var obj = JSON.parse(event.target.result);
    importData(obj);
}

document.getElementById('importFile').addEventListener('change', onChange);




//tables
function buildInputTable() {

	//clear table, but leaves header
	$("#inputTable tr.contentRow").remove(); 

	var table = document.getElementById("inputTable");


	//add data
	for (var i = data.length - 1; i >= 0; i--) {
		var value = data[i];
		var row = table.insertRow(-1);
		row.className = 'contentRow';

		var cell1 = row.insertCell(0);
		cell1.style.width = '20%;';
		var cell2 = row.insertCell(1);
		cell2.style.width = '80%;';
		cell1.innerHTML = "<button class='btn' onclick='deleteItem(this);''>Delete</button>";
		cell2.innerHTML = value;
		cell2.colSpan = 3;

	};

	//update count
	var count = data.length;
	$('#inputCount').text(count);

}

function buildResultsTable() {

	
	//clear table
	$("#resultsTable tr.contentRow").remove(); 



	//{'presenter': ['1', '2', '3']}

	var dict = resultsData();
	//error check
	if (dict == null) {
		//restart
		$("#buildResultsButton").click();

	} else {

		var keys = Object.keys(dict);
		var table = document.getElementById("resultsTable");


		for (var i = keys.length - 1; i >= 0; i--) {

			var key = keys[i];
			var data = dict[key];
			var row = table.insertRow(-1);
			row.className = 'contentRow';

			var cell1 = row.insertCell(0);
			cell1.innerHTML = key;

			var cell2 = row.insertCell(1);
			cell2.innerHTML = data[0];

			var cell3 = row.insertCell(2);
			cell3.innerHTML = data[1];

			var cell4 = row.insertCell(3);
			cell4.innerHTML = data[2];

		};

	}

	




}


























