// to make problem simple, year 1 - 10, people born and die, when they die, they will still count as live
// for that year. so [3,5] means born on year 3, population decrease by 1 on year 6

// O(years + number of people(n))

function yearMostPeople(years, arr) {
  var timeline = Array(years) // 10 in this case, make a timeline of all zeros representing base case
  for (var i = 0; i < timeline.length; i++) {
    timeline[i] = 0;
  }

  arr.forEach(function (person) { // each time point of array indicates how many new borns and deaths
    timeline[person[0] - 1] ++;
    timeline[person[1]] --;
  })

  var sum = 0, max = 0, mostPeopleIdx;
  timeline.forEach(function (time, idx) {
    sum += time;
    if (sum > max) {
      max = sum;
      mostPeopleIdx = idx + 1; // (year, idx = 0 is actually year 1)
    }
  })
  return "Year " + mostPeopleIdx + " with most ppl"
}

console.log(yearMostPeople(10, [[2,5],[3,7],[6,10],[1,4],[3,3]]));
