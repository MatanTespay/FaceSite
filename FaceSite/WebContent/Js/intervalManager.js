/**
 * Original by Zirak @ http://stackoverflow.com/a/8636050/1012431
 * 
 * Had some issues with the clear function
 * 
 * @type {{ intervals: Array to hold all intervals , make: make a new interval,
 *       clear: clear an interval , clearAll: clearAll intervals in the array }}
 */
var interval = {
	// to keep a reference to all the intervals
	intervals : [],

	// create another interval
	make : function(fun, delay, arryParam) {

		// var newKey = this.intervals.length + 1;
		var newKey = arryParam[0];

		// this.intervals[newKey] = setInterval(fun, delay);

		this.intervals[newKey] = setInterval(function() {
			fun(arryParam);
		}, delay);

		console.log('new interval created: ' + newKey);

		return newKey;

	},

	// clear a single interval
	clear : function(id) {

		if(this.intervals[id]){
			clearInterval(this.intervals[id]);
			delete this.intervals[id];

			console.log('removed interval : ' + id);

			return true;
		}
		else{
			console.log('didnt find interval : ' + id);
		}

		
	},

	// clear all intervals
	clearAll : function() {
		for ( var key in this.intervals) {
			clearInterval(this.intervals[key]);
			delete this.intervals[key];
		}
	}
};

/*
 * function createInterval(f, dynamicParameter, interval) {
 * 
 * setInterval(function() {f(dynamicParameter); }, interval); }
 */
// Then call it as
// createInterval(funca, dynamicValue, 500);
// var newInterval = setInterval.apply(window, [ fun, delay
// ].concat([].slice.call(arguments, 2)));
