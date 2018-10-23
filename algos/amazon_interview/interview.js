// Find a way to count numbers in array without using extra space and at O(n) time

// Implement draw functionality, mouseUp, mouseDown, mouseMove, and undo

// FIND min number of continents
// general idea is that I am creating a roadMap where key is city and has array of connection cities. Then we keep track of each city on visited or not, as we loop through each unvisited city we add 1 to continentCount and recursively buildOut the network of cities (and mark visited).

const cities = [1,2,3,4,5,6];
const roads = [[1,2],[2,4],[3,5],[2,6]];

function countContinents(cities, roads) {
    const roadMap = generateRoadMap(roads);
    let count = 0;

    const visited = cities.map((c) => false); // [ false, false, false, false, false, false ]
    
    for (var i = 0; i < visited.length; i++) {
        if (visited[i] === true) continue; // if this city is already visited, move on
        count++;
        createPathsAndMarkVisited(i + 1, roadMap, visited) // pass in cityId, map, and visited cities array
    }

    return count;
}

function createPathsAndMarkVisited(city, roadMap, visited) {
    // if visited, stop, else set visited to true
    if (visited[city - 1] === true) return;
    visited[city - 1] = true;

    // recursively visit destinations, when there mark it as visited to avoid infinite loops
    const destinations = roadMap[city];
    if (!destinations) return; // if no roads lead to other cities - we are done with this city
    destinations.forEach((destinationCity) => {
        createPathsAndMarkVisited(destinationCity, roadMap, visited);
    })
}

function generateRoadMap(roads) { // O(R)
    // generate a map where each key present a city and value is array of destinations
    // { '1': [ 2 ], '2': [ 1, 4, 6 ], '3': [ 5 ], '4': [ 2 ], '5': [ 3 ], '6': [ 2 ] }
    const map = {};
    function addDestinationToMap(city1, city2) {
        if (map[city1]) {
            map[city1].push(city2);
        } else {
            map[city1] = [city2];
        }
    }
    roads.forEach((r) => {
        const city1 = r[0], city2 = r[1];
        addDestinationToMap(city1, city2);
        addDestinationToMap(city2, city1);
    })
    return map;
}

console.log(countContinents(cities, roads)); 
// 2 continents 1,2,4,6  and 3,5