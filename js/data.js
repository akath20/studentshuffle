
var data = [];

function addItem (input) {
	input = input.trim();
	//data validation
	//make sure not empty
	if (input == '') {
		alert("Value Can't Be Blank");
		return;
	};

	//if value already present
	if (data.indexOf(input) != -1) {
		alert("Value already present.");
		return;
	};

	//add to data
	data.push(input);

	//reload table
	buildInputTable();

	
}

function deleteItem (object) {

	//get parent row
	var row = object.parentElement.parentElement;

	//get value of object in second row
	var value = row.cells[1].innerHTML;

	//delete from data
	data.splice(data.indexOf(value), 1);

	//reload table
	buildInputTable();


}

function importData(file) {

	//clear contents
	data = [];

	//clear table
	//clear table, but leaves header
	$("#inputTable tr.contentRow").remove(); 

	//already JSON
	for (var i = file.length - 1; i >= 0; i--) {
		addItem(file[i]);
	};

}

function resultsData() {

	resetStats();

	var dict = {};

	var criticalError = false;

	var alreadyObserved = [];

	for (var i = data.length - 1; i >= 0; i--) {

		

		//create a random list not including presentor or someone already in list, but include everyone
		var presenter = data[i];
		var observers = [];
		

		function alreadyObserved(input) {
			if (alreadyObserved.indexOf(input) != -1) {
				return true;
			} else {
				return false;
			}
		}

		function alreadyObserving(input) {
			if (observers.indexOf(input) != -1) {
				//already being used
				return true;
			} else {
				return false;
			}
		}

		function randomNumber(bottom, top) {
        	return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
		}

		function notUsed() {

			var notUsed = [];

			for (var i = data.length - 1; i >= 0; i--) {
				//go through everyone, if it's in alreadyObserved, don't add it
				if (alreadyObserved.indexOf(data[i]) == -1) {
					//if value not already observed, then not used
					notUsed.push(data[i]);
				};
			};

			return notUsed;
		}

		function generateObserver() {

			//make sure everyone has been used

			var notUsedArray = notUsed();
			if (notUsedArray.length > 0) {
				//filter and pick one that hasn't been observed yet
				
				//make sure not endless loop of only left if the presenter left in the not used array but also the presenter
				if (notUsedArray.length == 1) {
					if (notUsedArray[0] == presenter) {
						//choose a random one
						return data[randomNumber(0, (data.length - 1))];
					};
				};

				//pick anyone from notUsed
				return notUsedArray[randomNumber(0, (notUsedArray.length - 1))];


			} else {
				//else, choose a random one based on equal distribution


				var highest = 0;
				var keys = Object.keys(statsData);
				for (var i = keys.length - 1; i >= 0; i--) {
					var key = keys[i];
					var value = statsData[key];
					if (value > highest) {
						highest = value;
					}
				};



				var valuesNotAtHigh = [];
				for (var i = keys.length - 1; i >= 0; i--) {
					var key = keys[i];
					var value = statsData[key];

					if (value != highest) {
						valuesNotAtHigh.push(key);
					};
				};

				

				if (valuesNotAtHigh.length == 0) {
					//if all at equal length, pick random






					return data[randomNumber(0, (data.length - 1))];
				} else {
					//else, choose one that's not at high

					//make sure not endless loop of only left if the presenter left in the not used array but also the presenter
					if (valuesNotAtHigh.length == 1) {
						if (valuesNotAtHigh[0] == presenter) {
							//choose a random one
							return data[randomNumber(0, (data.length - 1))];
						};
					};


					return valuesNotAtHigh[randomNumber(0, (valuesNotAtHigh.length - 1))];
				}






				
			}
		}

		function isPresenter(input) {

			if (input == presenter) {
				return true;
			} else {
				return false;
			}
		}


		//generate three observers
		while (observers.length < 3) {
			//generate 3 observers
			//generate observer
			var observer = generateObserver();

			//if either one is true, regenerate
			var loopCount = 0
			while (isPresenter(observer) || alreadyObserving(observer)) {
				//regenerate if isPresenter and already presenting
				
				observer = generateObserver();
				loopCount++;

				if (loopCount >= 20) {
					console.error('critical error. restarting.')
					//possible stuck, retry everything
					criticalError = true;
					break;

				};
			}

			//once it's good, add to observers
			observers.push(observer);

			//debug data
			addStatsValue(observer);

			//add to list of already observed if not already there
			if (alreadyObserved.indexOf(observer) == -1) {
				alreadyObserved.push(observer);
			};
			
			
		}

		//all set for this presenter
		dict[presenter] = observers; 
	};

	if (criticalError) {
		return null;
	};

	//{'name': ['3X presenters']}
	printStats();
	return dict;


}












































