// function declarations(not function expressions) are also hoisted in its current scope

showState1();

function showState1() {
  console.log("Ready");
}

var showState1 = function() {
  console.log("Idle");
};

// output: Ready
////////////////////////////////////////////////////////

// function declaration versus variable assignment, the last takes priority.
// since function declaration is hoisted, function expression is evaluated

var showState2 = function() {
  console.log("Idle");
};

function showState2() {
  console.log("Ready");
}

showState2();

// output: Idle
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
