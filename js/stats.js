

var statsData = {};



function resetStats () {
	// body...
	statsData = {};
}

function addStatsValue(value) {

	//see if value already present
	if (statsData[value] == undefined) {
		//not present, add it
		statsData[value] = 1;
	} else {
		//present, increment it
		statsData[value] += 1;
	}
}

function printStats() {
	var keys = Object.keys(statsData);
	console.log('stats Data:\n');

	for (var i = keys.length - 1; i >= 0; i--) {
		var key = keys[i];
		var value = statsData[key];
		console.log(key + ': ' + value + '\n');
	};
}