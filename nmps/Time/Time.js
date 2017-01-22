module.exports = {
	getTimestamp: function() {
		var d = new Date();
		var seconds = d.getSeconds();
		var minutes = d.getMinutes();
		var hours = d.getHours();
		var timestamp = hours + ":" + minutes + ":" + seconds;
		return timestamp;
	}
}
