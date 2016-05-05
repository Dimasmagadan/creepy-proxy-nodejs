var ips = [
	'188.40.243.163',
	'188.40.243.164',
	'188.40.243.165',
	'188.40.243.166',
	'188.40.243.167',
	'188.40.243.168'
];

module.exports = function(){
	var key = Math.floor(Math.random()*4);
	return ips[key];
};