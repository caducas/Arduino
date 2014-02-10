
try {
	var arduino = require('duino'),
	    board = new arduino.Board({
			device: "USB",
	    	debug: true
	    });
} catch(err) {
	console.log('ARDUINO: Error initiating Arduino board, maybe not connected - try to reconnect!');
}

function execute(opts) {
}

function listenEvent(eventId, opts) {
	try{
		if(!opts.pin) {
			throw new Error("option 'pin' is missing");
		}
		var interval = opts.interval || 5000;

		var listenPort = new arduino.Sensor({
			board: board,
			pin: opts.pin,
			throttle: interval
		});

		listenOnPort(eventId, listenPort);
	} catch (err) {
		console.log('ARDUINO: Error starting listener!');
	}
}

function listenOnPort(eventId, listenPort) {
	console.log('should start listener for Arduino');
	listenPort.on('read', function(err, value) {
		value = +value;
		process.emit(eventId+'', eventId, value);
	});
}

// If we're running under Node, 
if(typeof exports !== 'undefined') {
	exports.execute = execute;
	exports.listenEvent = listenEvent;
}