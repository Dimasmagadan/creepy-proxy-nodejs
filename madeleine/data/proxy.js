var ips = [
  '188.40.243.161',
  '188.40.243.162',
  '188.40.243.163',
  '188.40.243.164',
  '188.40.243.165',
  '188.40.243.166'
];

module.exports = function(){
	var key = Math.floor(Math.random()*4);
	return ips[key];
};