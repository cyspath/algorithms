/*
Your previous Plain Text content is preserved below:

You are working with a team of meteorologists studying temperatures in a city. They have asked you to build a system that will track temperatures and provide metrics.

Your system should provide a function `log(temperature)’ that they will call once per second to record measured temperatures, as well as functions to query their data for useful metrics. They would like to be able to know:
1) the maximum temperature recorded thus far,
2) the average of all temperatures recorded,
3) the average of all temperatures from the last 24 hours, and
4) the maximum temperature from the last 24 hours.
 */

var temperatures = [];
var max = null;
var average = 0;
var secs = 24 * 60 * 60;
var dayAverage = null;
var dayMax = null;

function log(t) {
  calcAverage(t);
  calcDayAverage(t);
  calcDayMax(t);
  calcMax(t);
  temperatures.push(t);
  console.log(temperatures, 'max', max, 'average', average, 'dayAverage', dayAverage, 'dayMax', dayMax);
}

function calcMax(t) {
  return max = max === null ? t : Math.max(t, max);
}

function calcAverage(t) {
  average = (average * temperatures.length + t) / (temperatures.length + 1);
}

function calcDayAverage(t) {
  if (temperatures.length < secs) {
    return dayAverage = average;
  } else {
    dayAverage = (dayAverage * secs - temperatures[temperatures.length - secs] + t) / secs
  }
}

function calcDayMax(t) {
  if (temperatures.length < secs) {
    return dayMax = calcMax(t);
  }
  var dayAverageWithoutMaxWithNewT = (dayAverage * secs - max + t) / secs;
  if (dayAverageWithoutMaxWithNewT > dayAverage) {
    dayMax = t;
  }
}

// TO TEST: we set day length = 3 seconds for a more visual testing:
(function test(arr) {
  console.log(`Tests for ${arr}, setting number of secs in a day to only 3`);
  secs = 3;
  for (var i = 0; i < arr.length; i++) {
    log(arr[i]);
  }
})([2,1,3,0,4]);
